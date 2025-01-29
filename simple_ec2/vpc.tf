module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  name   = "${var.project}-${var.region}-vpc"
  cidr   = var.vpc_cidr

  azs             = local.azs
  public_subnets  = local.public_subnets

  enable_dns_hostnames = true
  enable_dns_support   = true

  manage_default_security_group = true

  default_security_group_ingress = [
    {
      description = "Allow HTTP"
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      description = "Allow HTTPS"
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      description = "Allow SSH"
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = "0.0.0.0/0"
    },
  ]

  default_security_group_egress = [
    {
      description = "Allow all outbound traffic"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = "0.0.0.0/0"
    },
  ]

  public_subnet_tags = {
    "environment"            = var.environment
  }

  tags = {
    environment = var.environment
  }
}