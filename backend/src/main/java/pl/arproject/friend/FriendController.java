package pl.arproject.friend;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.arproject.friend.invitation.FriendInvitationRequest;

@RestController
@RequestMapping("/api/friends")
@AllArgsConstructor
public class FriendController {

    private final FriendService friendService;

    @PostMapping("/invite")
    public ResponseEntity<?> sendInvitationToFriends(@RequestBody FriendInvitationRequest request) {
        return friendService.sendInvitationToFriends(request);
    }
}
