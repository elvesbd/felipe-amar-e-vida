variable "aws_region" {
  description = "AWS region para deploy dos recursos"
  type        = string
  default     = "sa-east-1"
}

variable "bucket_name" {
  description = "Nome do bucket S3 para hospedar o frontend"
  type        = string
  default     = "felipe-amar-e-vida"
}
