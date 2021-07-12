# https://github.com/duolingo/infra-galaxy/tree/master/modules/s3_website
module "NFT-prod-s3" {
  source          = "github.com/duolingo/infra-galaxy//modules/s3_website"
  domain_name     = "nft.duolingo.com"
  environment     = var.environment
  owner           = var.owner
  product         = var.product
  service         = var.service
  ssl_cert_domain = "*.duolingo.com"
  subservice      = "s3"

  # Enable "Use Origin Cache Headers" setting
  default_cache_default_ttl = null
  default_cache_max_ttl     = null
  default_cache_min_ttl     = null
}
