variable "project" {
  description = "The name for generic stuff"
  type        = string
  default     = "yada"
}

variable "environment" {
  description = "The environment for the bucket"
  type        = string
}

variable "instance_type" {
  type        = string
  description = "ec2 instance type"
}

variable "vpc_cidr" {
  type        = string
  description = "vpc cidr block"
}

variable "region" {
  type        = string
  description = "aws region"
}

variable "az_count" {
  type        = number
  description = "number of az to use, starts on a"
}

