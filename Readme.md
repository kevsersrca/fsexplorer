File Explorer
=============

A file explorer application built with NestJS (backend) and Vue (frontend) for managing files on Cloudflare R2 (S3-compatible). This project supports operations such as file upload, download, deletion, renaming, and folder creation/deletion. The application is fully dockerized for easy deployment.

* * * * *

Features
--------

-   **File Management**: Upload, download, delete, and rename files.
-   **Folder Management**: Create and delete folders (using S3 prefixes).
-   **Nested Folder Structure**: Visualize files and folders in a collapsible tree view.
-   **Dockerized**: Both backend and frontend are containerized with Docker and orchestrated via Docker Compose.
-   **RESTful API**: Built with NestJS for robust backend services.
-   **Modern Frontend**: Vue-based UI with responsive design.

* * * * *

Getting Started
---------------

### Prerequisites

-   Docker installed on your system.
-   Docker Compose installed.
-   A Cloudflare R2 account with S3-compatible access credentials.

* * * * *

Installation
------------

1.  **Clone the Repository:**

    ```
    git clone https://github.com/yourusername/file-explorer.git
    cd file-explorer
    ```

2.  **Configure Environment Variables:**

    Update the `docker-compose.yml` file in the `backend` service with your Cloudflare R2 credentials:

    `environment:
    - R2_BUCKET=your_r2_bucket
    - R2_REGION=auto
    - R2_ENDPOINT=https://<your-account-id>.r2.cloudflarestorage.com
    - R2_ACCESS_KEY_ID=your_access_key_id
    - R2_SECRET_ACCESS_KEY=your_secret_access_key`

* * * * *

Docker Setup
------------

The project contains two Dockerfiles---one for the NestJS backend and one for the Vue frontend. A `docker-compose.yml` file orchestrates both services.

### Build and Run Containers

In the project root (where `docker-compose.yml` is located), run:


```
docker-compose build
docker-compose up -d
```

-   **Backend** is available at <http://localhost:3000>
-   **Frontend** is available at <http://localhost>

### Stopping Containers

To stop the containers, run:

`docker-compose down`

* * * * *

Project Structure
-----------------

```
file-explorer/
├── backend/
│   ├── src/
│   │   ├── r2.controller.ts
│   │   ├── r2.service.ts
│   │   └── ... (other NestJS modules)
│   ├── package.json
│   ├── Dockerfile
│   └── ... (other backend files)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileBrowser.vue
│   │   │   ├── UploadSection.vue
│   │   │   ├── FolderCreateSection.vue
│   │   │   ├── FolderDeleteSection.vue
│   │   │   ├── FolderStructure.vue
│   │   │   └── NestedFolder.vue
│   │   ├── App.vue
│   │   └── main.js
│   ├── package.json
│   ├── Dockerfile
│   └── ... (other frontend files)
├── docker-compose.yml
└── README.md
```

* * * * *

License
-------

This project is licensed under the MIT License. See the LICENSE file for details.

* * * * *

Contributing
------------

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

* * * * *

Contact
-------

For any questions or feedback, please reach out to kevser.sirca@gmail.com