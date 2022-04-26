package pl.arproject.mapper;

import org.springframework.stereotype.Service;
import pl.arproject.friend.invitation.FriendInvitation;
import pl.arproject.friend.invitation.FriendInvitationResponse;

import java.util.ArrayList;
import java.util.List;

@Service
public class Mapper {

    public List<FriendInvitationResponse> getResponses(List<FriendInvitation> invitations) {
        List<FriendInvitationResponse> responses = new ArrayList<>();

        for(FriendInvitation invitation : invitations) {
            FriendInvitationResponse response = new FriendInvitationResponse(
                    invitation.getSender().getUsername());
            responses.add(response);
        }
        return responses;
    }
}
