module "frontend_website" {
  source = "./modules/frontend-website"

  providers = {
    aws           = aws
    aws.us-east-1 = aws.us-east-1
  }

  domain_name    = var.domain_name
  subdomain_name = local.subdomain_name
}

# State migration moved blocks to ensure zero-downtime refactoring
moved {
  from = aws_s3_bucket.website_bucket
  to   = module.frontend_website.aws_s3_bucket.website_bucket
}

moved {
  from = aws_s3_bucket_website_configuration.website_config
  to   = module.frontend_website.aws_s3_bucket_website_configuration.website_config
}

moved {
  from = aws_s3_bucket_public_access_block.website_public_access_block
  to   = module.frontend_website.aws_s3_bucket_public_access_block.website_public_access_block
}

moved {
  from = aws_s3_bucket_policy.cloudfront_oac_policy
  to   = module.frontend_website.aws_s3_bucket_policy.cloudfront_oac_policy
}

moved {
  from = aws_acm_certificate.cert
  to   = module.frontend_website.aws_acm_certificate.cert
}

moved {
  from = aws_route53_record.cert_validation
  to   = module.frontend_website.aws_route53_record.cert_validation
}

moved {
  from = aws_acm_certificate_validation.cert
  to   = module.frontend_website.aws_acm_certificate_validation.cert
}

moved {
  from = aws_cloudfront_origin_access_control.default
  to   = module.frontend_website.aws_cloudfront_origin_access_control.default
}

moved {
  from = aws_cloudfront_distribution.website_distribution
  to   = module.frontend_website.aws_cloudfront_distribution.website_distribution
}

moved {
  from = aws_route53_record.www
  to   = module.frontend_website.aws_route53_record.www
}
