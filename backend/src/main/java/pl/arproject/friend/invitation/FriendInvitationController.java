package pl.arproject.friend.invitation;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/friends/invitations")
@AllArgsConstructor
public class FriendInvitationController {

    private final FriendInvitationService friendInvitationService;

    @GetMapping("/{username}")
    public ResponseEntity<?> getInvitationsByUsername(
            @PathVariable("username") String username) {

        return friendInvitationService.getInvitationsByUsername(username);
    }
}
