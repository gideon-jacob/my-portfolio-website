variable "aws_region" {
  description = "The AWS region to deploy resources in"
  type        = string
  default     = "ap-south-1"
}

variable "domain_name" {
  description = "The root domain name"
  type        = string
  default     = "gideonjacob.in"
}

variable "subdomain_name" {
  description = "The subdomain for the portfolio"
  type        = string
  default     = "portfolio.gideonjacob.in"
}
