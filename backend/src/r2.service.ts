import {
  GetObjectCommand,
  CopyObjectCommand,
  DeleteObjectsCommand,
  S3Client,
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Readable } from 'stream';

dotenv.config();

@Injectable()
export class R2Service {
  private s3Client: S3Client;
  private bucket = process.env.R2_BUCKET;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.R2_REGION,
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });
  }

  async listFiles(prefix = '') {
    let isTruncated = true;
    let continuationToken = undefined;
    const allFiles = [];

    while (isTruncated) {
      const command = new ListObjectsV2Command({
        Bucket: this.bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      });
      const response = await this.s3Client.send(command);
      allFiles.push(...(response.Contents || []));
      isTruncated = response.IsTruncated;
      continuationToken = response.NextContinuationToken;
    }

    return allFiles;
  }


  async uploadFile(key: string, body: Buffer) {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: body,
    });
    return await this.s3Client.send(command);
  }

  async deleteFile(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    return await this.s3Client.send(command);
  }

  async deleteFolder(prefix: string) {
    if (!prefix.endsWith('/')) {
      prefix += '/';
    }

    const listCommand = new ListObjectsV2Command({
      Bucket: this.bucket,
      Prefix: prefix,
    });
    const listResult = await this.s3Client.send(listCommand);

    const objectsToDelete =
        listResult.Contents?.map((obj) => ({ Key: obj.Key })) || [];

    if (objectsToDelete.length === 0) {
      return { message: 'No objects found to delete under this prefix.' };
    }

    const deleteCommand = new DeleteObjectsCommand({
      Bucket: this.bucket,
      Delete: {
        Objects: objectsToDelete,
      },
    });
    await this.s3Client.send(deleteCommand);

    return {
      message: 'All objects under the folder (prefix) have been deleted.',
      prefix,
    };
  }

  async downloadFile(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    const response = await this.s3Client.send(command);
    return response.Body as Readable;
  }

  async renameFile(oldKey: string, newKey: string) {
    const copyCommand = new CopyObjectCommand({
      Bucket: this.bucket,
      CopySource: `${this.bucket}/${oldKey}`,
      Key: newKey,
    });
    await this.s3Client.send(copyCommand);
    await this.deleteFile(oldKey);
    return { oldKey, newKey };
  }

  async createFolder(folderName: string) {
    const key = folderName.endsWith('/') ? folderName : folderName + '/';
    return await this.uploadFile(key, Buffer.alloc(0));
  }
}
