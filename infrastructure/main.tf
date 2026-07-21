terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "gideon-tfstate-bucket"
    key    = "my-portfolio-website/terraform.tfstate"
    region = "ap-south-1"
  }
}
locals {
  env             = (terraform.workspace == "default" || terraform.workspace == "production") ? "production" : terraform.workspace
  subdomain_name  = local.env == "production" ? var.subdomain_name : "dev-portfolio.${var.domain_name}"
  application_tag = local.env == "production" ? aws_servicecatalogappregistry_application.my_app[0].application_tag : data.aws_servicecatalogappregistry_application.my_app[0].application_tag
}

# Provider with no default tags used to bootstrap the application metadata resource
# to prevent circular dependencies.
provider "aws" {
  alias  = "appregistry"
  region = var.aws_region
}

resource "aws_servicecatalogappregistry_application" "my_app" {
  count       = local.env == "production" ? 1 : 0
  provider    = aws.appregistry
  name        = var.application_name
  description = "Application metadata to track ${var.application_name} billing and resources"

  tags = {
    Environment = "production"
  }

  lifecycle {
    prevent_destroy = true
  }
}

data "aws_servicecatalogappregistry_application" "my_app" {
  count    = local.env != "production" ? 1 : 0
  provider = aws.appregistry
  id       = var.application_name
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = local.application_tag
  }
}

provider "aws" {
  alias  = "us-east-1"
  region = "us-east-1"
  default_tags {
    tags = local.application_tag
  }
}

