package pl.arproject.friend;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.arproject.friend.invitation.FriendInvitationRequest;
import pl.arproject.friend.request.FriendDeleteRequest;

@RestController
@RequestMapping("/api/friends")
@AllArgsConstructor
public class FriendController {

    private final FriendService friendService;

    @PostMapping("/invite")
    public ResponseEntity<?> sendInvitationToFriends(
            @RequestBody FriendInvitationRequest request) {

        return friendService.sendInvitationToFriends(request);
    }

    @PostMapping("/accept")
    public ResponseEntity<?> acceptInvitation(
            @RequestBody FriendInvitationRequest request) {

        return friendService.acceptInvitation(request);
    }

    @PostMapping("/decline")
    public ResponseEntity<?> declineInvitation(
            @RequestBody FriendInvitationRequest request) {

        return friendService.declineInvitation(request);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getAllFriends(@PathVariable("username") String username) {
        return friendService.getAllFriends(username);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFriendConnection(@RequestBody FriendDeleteRequest request) {
        return friendService.deleteFriendConnection(request);
    }
}
