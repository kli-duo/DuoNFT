data "aws_route53_zone" "duolingo" {
  name = "duolingo.com."
}

resource "aws_route53_record" "NFT-prod-route53-record" {
  zone_id = data.aws_route53_zone.duolingo.zone_id
  name    = module.NFT-prod-s3.id
  type    = "A"

  alias {
    name                   = module.NFT-prod-s3.domain_name
    zone_id                = module.NFT-prod-s3.hosted-zone-id
    evaluate_target_health = "false"
  }
}
