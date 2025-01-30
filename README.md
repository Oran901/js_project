# Fruit Emoji App

This project is a Node.js application designed to display the number of fruits stored in a MongoDB database, represented as emojis. The project is structured into several directories, each serving a specific purpose in the application's deployment and infrastructure.

## Project Structure

- **app**: Contains the Node.js source code, including routing and validation logic. It connects to a MongoDB database to retrieve and display the count of fruits.

- **ec2-infra**: Defines the architecture for deploying the application on an EC2 instance using Docker Compose. This setup includes:
  - The Node.js application
  - MongoDB
  - Watchtower for monitoring and updating Docker images

- **infra-repo**: A Terraform project for provisioning an EKS cluster, divided into two modules:
  - `eks-infra`: Provisions the EKS cluster and related components.
  - `eks-helm`: Deploys components on the cluster, such as Ingress-NGINX and ArgoCD.

- **git-ops**: Contains ArgoCD applications, including:
  - An application that monitors the Node.js app Helm chart.
  - Another application overseeing the continuous deployment process.

## Deployment

The project supports CI/CD through:
- **GitHub Actions**: Automates testing and deployment processes.
- **Watchtower/ArgoCD**: Ensures continuous delivery and updates.