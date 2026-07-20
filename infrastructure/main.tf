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

# Provider with no default tags used to bootstrap the application metadata resource
# to prevent circular dependencies.
provider "aws" {
  alias  = "appregistry"
  region = var.aws_region
}

resource "aws_servicecatalogappregistry_application" "my_app" {
  provider    = aws.appregistry
  name        = var.application_name
  description = "Application metadata to track ${var.application_name} billing and resources"

  tags = {
    Environment = "production"
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = aws_servicecatalogappregistry_application.my_app.application_tag
  }
}

provider "aws" {
  alias  = "us-east-1"
  region = "us-east-1"
  default_tags {
    tags = aws_servicecatalogappregistry_application.my_app.application_tag
  }
}
