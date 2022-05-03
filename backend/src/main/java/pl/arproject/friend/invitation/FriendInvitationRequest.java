package pl.arproject.friend.invitation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FriendInvitationRequest {
    private String senderUsername;
    private String receiverUsername;
}
