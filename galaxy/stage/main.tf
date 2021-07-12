# The AWS region. This is normally us-east-1
provider "aws" {
  region  = "us-east-1"
  version = "~> 2.0"
}

terraform {
  backend "s3" {
    bucket         = "infra-galaxy-state"
    key            = "duolingo/NFT/stage/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = "true"
    dynamodb_table = "infra-galaxy-lock"
  }

  required_version = "0.12.29"
}
