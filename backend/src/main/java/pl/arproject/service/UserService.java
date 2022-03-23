package pl.arproject.service;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.apache.commons.codec.digest.DigestUtils;
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
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(userFromDb);
    }

    public ResponseEntity registerUser(User user) {
        Optional<User> userFromDb = userRepository.findByUsername(user.getUsername());

        if(userFromDb.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }

        String passwordMdHash = DigestUtils.md5Hex(user.getPassword());
        user.setPassword(passwordMdHash);
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity loginUser(User user) {
        Optional<User> userFromDb = userRepository.findByUsername(user.getUsername());

        if(!areUsernameAndPasswordCorrect(userFromDb, user)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().build();
    }

    public ResponseEntity deleteUserById(Long id) {
        Optional<User> userFromDb = userRepository.findById(id);

        if(userFromDb.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    // to do
    private boolean areUsernameAndPasswordCorrect(Optional<User> userFromDb, User user) {
        if(userFromDb.isPresent()) {
            String passwordMdHash = DigestUtils.md5Hex(user.getPassword());
            return userFromDb.get().getPassword().equals(passwordMdHash);
        } else {
            return false;
        }
    }
}
