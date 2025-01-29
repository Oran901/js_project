locals {
  # Calculate number of AZs in the region
  az_count = min(var.az_count, length(data.aws_availability_zones.available.names))

  # Generate CIDR blocks for public subnets
  public_subnets = [
    for az_index in range(local.az_count) :
    cidrsubnet(var.vpc_cidr, 8, az_index)
  ]

  # Generate CIDR blocks for private subnets
  private_subnets = [
    for az_index in range(local.az_count) :
    cidrsubnet(var.vpc_cidr, 8, az_index + local.az_count)
  ]

  # Map AZs to their names
  azs = data.aws_availability_zones.available.names

  # security group inbound rules

  sg_inbound = {
    ssh = { port = 22, description = "Allow SSH access" }
  }

}

data "aws_availability_zones" "available" {
  state = "available"
}

