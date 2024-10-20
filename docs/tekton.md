### Step 1: Install Minikube

1. **Install Minikube**:

   **For Linux**:
   [https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download)

2. **Start Minikube**:
   ```bash
   minikube start
   ```

3. **Verify Minikube is Running**:
   ```bash
   minikube status
   ```

### Step 2: Install Tekton

1. **Install Tekton Pipelines**:
   [https://tekton.dev/docs/pipelines/install/](https://tekton.dev/docs/pipelines/install/)

2. **Verify Installation**:
   ```bash
   kubectl get pods --namespace tekton-pipelines
   ```

### Step 3: Clone the GitHub Repository

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Pro-Minds/Readwell-original.git
   cd Readwell-original
   ```

### Step 4: Define Tekton Resources

1. **Create Tekton Tasks**:
   Create a file named `tasks.yaml` in the root of your repository:

2. **Create a Pipeline**:

3. **Create a PipelineRun**:
   Create a file named `pipeline-run.yaml`:


### Step 5: Apply the Tekton Resources

1. **Apply Your Configurations**:
   ```bash
   kubectl apply -f tasks.yaml
   kubectl apply -f pipeline.yaml
   kubectl apply -f pipeline-run.yaml
   ```
   The command `kubectl apply -f tasks.yaml` is used to create or update resources defined in the `tasks.yaml` file in your Kubernetes cluster. Here's a breakdown of what this command does:

    ### What Happens When You Run This Command

    1. **Resource Creation**: If `tasks.yaml` defines new tasks (like `build-backend` and `build-frontend`), those tasks will be created in the Tekton Pipelines system.

    ### Viewing the Created Tasks
    
    To view the tasks you just created, you can use the following command:
    
    ```bash
    kubectl get tasks
    ```
    
    This command will list all the tasks in the current namespace. If you want to see tasks in a specific namespace, you can add the `-n <namespace>` flag:
    
    ```bash
    kubectl get tasks -n readwell-pipeline
    ```
    
    ### Viewing Detailed Information
    
    If you want to see detailed information about a specific task, you can use:
    
    ```bash
    kubectl describe task build-backend
    ```
    
    or
    
    ```bash
    kubectl describe task build-frontend
    ```

   The command `kubectl apply -f pipeline.yaml`:

   1. **Creates or Updates**: It creates a Tekton pipeline resource defined in the `pipeline.yaml` file, specifically a pipeline named `readwell-pipeline`.
   2. **Declarative Management**: If a pipeline with the same name already exists, it updates the existing pipeline with the new configuration specified in the file.
   3. **Output Confirmation**: The output message confirms that the pipeline has been successfully created.

    ### To See What Has Been Created
    
    To view the created pipelines, use the following command:
    
    ```bash
    kubectl get pipelines
    ```
    
    This will list all the pipelines in the current namespace. For more detailed information about a specific pipeline, you can use:
    
    ```bash
    kubectl describe pipeline readwell-pipeline
    ```

   The command `kubectl apply -f pipeline-run.yaml`:

   1. **Creates or Updates**: It creates a Tekton PipelineRun resource defined in the `pipeline-run.yaml` file, specifically a PipelineRun named `readwell-pipeline-run`.
   2. **Executes the Pipeline**: This PipelineRun triggers the execution of the associated pipeline (in this case, `readwell-pipeline`).
   3. **Output Confirmation**: The output message confirms that the PipelineRun has been successfully created.

    ### To See What Has Been Created
    
    To view the created PipelineRuns, use the following command:
    
    ```bash
    kubectl get pipelineruns
    ```
    
    This will list all the PipelineRuns in the current namespace. For more detailed information about a specific PipelineRun, you can use:
    
    ```bash
    kubectl describe pipelinerun readwell-pipeline-run
    ```
    
    

### Step 6: Monitor the Pipeline

1. **Check the Status**:
   ```bash
   tkn pipelinerun describe readwell-pipeline-run
   ```

### Step 7: Deploy the Application

1. **Create Deployment Files**:
   Create a file named `backend-deployment.yaml` for the backend:

   Create a file named `frontend-deployment.yaml` for the frontend:

2. **Apply the Deployment Files**:
   ```bash
   kubectl apply -f backend-deployment.yaml
   kubectl apply -f frontend-deployment.yaml
   ```
   The command `kubectl apply -f backend-deployment.yaml`:

   1. **Creates or Updates**: It creates a Kubernetes Deployment resource defined in the `backend-deployment.yaml` file, specifically a Deployment named `backend`.
   2. **Manages Pods**: The Deployment manages the specified number of Pods running the application defined in the file, ensuring they are up and running.
   3. **Output Confirmation**: The output message confirms that the Deployment has been successfully created.

       ### To See What Has Been Created
    
       To view the created Deployments, use the following command:
    
       ```bash
       kubectl get deployments
       ```
    
       This will list all the Deployments in the current namespace. For more detailed information about a specific Deployment, you can use:
    
       ```bash
       kubectl describe deployment backend
       ```
    
       This command provides detailed information about the `backend` Deployment, including its status, replicas, and events.

### Step 8: Expose Your Applications

1. **Expose the Backend**:
   ```bash
   kubectl expose deployment backend --type=NodePort --port=8080
   ```

2. **Expose the Frontend**:
   ```bash
   kubectl expose deployment frontend --type=NodePort --port=3000
   ```

### Step 9: Access Your Applications

1. **Get the NodePort**:
   ```bash
   kubectl get services
   ```

2. **Access Your Applications**:
   Open your browser and go to `http://<minikube-ip>:<backend-port>` for the backend and `http://<minikube-ip>:<frontend-port>` for the frontend. You can get the Minikube IP by running:
   ```bash
   minikube ip
   ```

### Conclusion

You now have a Tekton pipeline set up to build and deploy the Readwell application using Docker images from Docker Hub. You can further enhance this setup by adding testing stages, notifications, or additional configurations as needed!