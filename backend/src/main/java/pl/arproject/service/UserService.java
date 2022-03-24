package pl.arproject.service;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.arproject.cryptography.AdvancedEncryptionStandard;
import pl.arproject.entity.User;
import pl.arproject.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public ResponseEntity findAllUsers() {
        List<User> users = userRepository.findAll();

        return ResponseEntity.ok(users);
    }

    public ResponseEntity findUserByUsername(String username) {
        Optional<User> userFromDb = userRepository.findByUsername(username);

        if(userFromDb.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("User " + username + " not found");
        }
        return ResponseEntity.ok(userFromDb);
    }

    public ResponseEntity registerUser(User user) {
        Optional<User> userFromDb = userRepository.
                findByUsernameOrEmail(user.getUsername(), user.getEmail());

        if(userFromDb.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body("Given username or email is already taken");
        }

        String encryptedPassword = AdvancedEncryptionStandard.encrypt(user.getPassword());
        user.setPassword(encryptedPassword);
        userRepository.save(user);

        return ResponseEntity.ok().body("Successfully registered");
    }

    public ResponseEntity loginUser(User user) {
        Optional<User> userFromDb = userRepository.findByEmail(user.getEmail());

        if(!areEmailAndPasswordCorrect(userFromDb, user)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Given email or password is incorrect");
        }
        return ResponseEntity.ok().body("Successfully logged in");
    }

    public ResponseEntity deleteUserById(Long id) {
        Optional<User> userFromDb = userRepository.findById(id);

        if(userFromDb.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("User with id: " + id + " not found");
        }
        userRepository.deleteById(id);

        return ResponseEntity.ok().body("Successfully deleted");
    }

    private boolean areEmailAndPasswordCorrect(Optional<User> userFromDb, User user) {
        if(userFromDb.isPresent()) {
            String encryptedPassword = AdvancedEncryptionStandard.encrypt(user.getPassword());
            return userFromDb.get().getPassword().equals(encryptedPassword);
        } else {
            return false;
        }
    }
}
