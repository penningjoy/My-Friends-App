# Security Policy

## Security Features

This application implements the following security measures:

### 1. Content Security Policy (CSP)
- CSP headers configured in `index.html` and `nginx.conf`
- Restricts resource loading to trusted sources
- Helps prevent XSS attacks

**Note on CSP Configuration:**
The current CSP includes `'unsafe-inline'` and `'unsafe-eval'` in script-src, which are required for Angular 8 to function. While this weakens XSS protection, it's a necessary trade-off for this legacy Angular version. When upgrading to a modern Angular version (12+), these directives can be removed in favor of:
- Using nonces or hashes for inline scripts
- Refactoring to eliminate the need for eval()
- Implementing stricter CSP policies

### 2. Security Headers
The following HTTP security headers are configured in the Nginx configuration:
- `X-Frame-Options: DENY` - Prevents clickjacking attacks
- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-XSS-Protection: 1; mode=block` - Enables browser XSS protection
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information
- `Content-Security-Policy` - See CSP section above

### 3. Input Validation and Sanitization
- All user inputs are validated and sanitized before processing
- Maximum input length of 100 characters enforced
- Only alphanumeric characters, spaces, hyphens, and apostrophes allowed in friend names
- HTML maxlength attributes prevent excessive input in forms

### 4. Secure Error Handling
- Error messages don't expose sensitive system information
- Detailed error information is not logged in production
- User-friendly error messages are displayed

### 5. Server Configuration
- Nginx server tokens disabled to prevent version disclosure
- Access to hidden files (.git, etc.) is denied
- Gzip compression enabled for better performance
- Static assets are cached appropriately

## Known Limitations

### Angular Version
This application uses Angular 8.2.4, which has reached end-of-life. For production use:
- Consider upgrading to the latest supported Angular version (Angular 17+ as of 2026)
- Regular security updates are no longer provided for Angular 8
- See the [Angular Update Guide](https://update.angular.io/) for migration steps

### Dependencies
- Some npm packages have known vulnerabilities
- Run `npm audit` regularly to check for security issues
- Use `npm audit fix` to automatically fix vulnerabilities where possible

## Security Best Practices

### For Development
1. Never commit sensitive data (API keys, passwords, etc.)
2. Use environment variables for configuration
3. Keep dependencies up to date
4. Run security linters regularly

### For Deployment
1. Always use HTTPS in production
2. Enable HSTS (HTTP Strict Transport Security)
3. Implement rate limiting to prevent abuse
4. Use a Web Application Firewall (WAF) if possible
5. Regular security audits and penetration testing
6. Monitor application logs for suspicious activity

### For Production Deployment
When deploying to production, consider:
1. Adding HTTPS/TLS certificates
2. Enabling HSTS headers
3. Implementing authentication and authorization
4. Adding rate limiting and DDoS protection
5. Regular security updates and patches
6. Security monitoring and logging

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please:
1. Do NOT open a public issue
2. Contact the repository maintainer directly
3. Provide detailed information about the vulnerability
4. Allow time for the issue to be addressed before disclosure

## Security Checklist

- [x] Content Security Policy implemented
- [x] Security headers configured
- [x] Input validation and sanitization
- [x] Secure error handling
- [x] Server hardening (Nginx configuration)
- [x] Input length limits
- [ ] HTTPS enforcement (requires production deployment)
- [ ] Rate limiting (requires additional infrastructure)
- [ ] Authentication/Authorization (not implemented - add if needed)
- [ ] Angular version upgrade (recommended for production)

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Angular Security Guide](https://angular.io/guide/security)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
- [Nginx Security Best Practices](https://www.nginx.com/blog/mitigating-ddos-attacks-with-nginx-and-nginx-plus/)
