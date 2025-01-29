provider "aws" {
  region = var.region
  assume_role {
    role_arn     = "arn:aws:sts::767397954823:role/_localadmin_tf_role"
    session_name = "TerraformSession"
  }
}


terraform {
  backend "s3" {
    bucket         = "terraform-state-js-ec2"    # Replace with your S3 bucket name
    key            = "terraform/state.tfstate" # Path to the state file in the bucket
    region         = "us-east-1"               # AWS region of the S3 bucket
    encrypt        = true                      # Encrypt state file at rest
    dynamodb_table = "terraform-lock-table-js-ec2"    # Optional for state locking
  }
  required_version = ">= 0.13"
}