package pl.arproject.registration.token;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;

    public void saveConfirmationToken(ConfirmationToken token) {
        confirmationTokenRepository.save(token);
    }

    public Optional<ConfirmationToken> findByToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }

    public void updateConfirmedAt(String token) {
        confirmationTokenRepository.updateConfirmedAt(token, LocalDateTime.now());
    }

    public ConfirmationToken findByUserId(Long userId) {
        return confirmationTokenRepository.findByUserId(userId);
    }

    public void refreshToken(Long userId,
                             String token,
                             LocalDateTime createdAt,
                             LocalDateTime expiresAt) {

        confirmationTokenRepository.refreshToken(userId, token, createdAt, expiresAt);
    }
}
