package pl.arproject.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.arproject.entity.User;
import pl.arproject.service.UserService;

@AllArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity findAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{username}")
    public ResponseEntity findUserByUsername(@PathVariable String username) {
        return userService.findUserByUsername(username);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUserById(@PathVariable Long id) {
        return userService.deleteUserById(id);
    }

    @PostMapping
    public ResponseEntity registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity loginUser(@RequestBody User user) {
        return userService.loginUser(user);
    }
}
