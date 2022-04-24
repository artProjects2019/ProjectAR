package pl.arproject.security;

import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;

@Getter
@Configuration
public class JwtProperties {

    @Value("${app.jwt.secretKey}")
    private String secretKey;

    @Value("${app.jwt.prefix}")
    private String prefix;

    @Value("${app.jwt.expirationAfterHour}")
    private int hour;

    public SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
}
