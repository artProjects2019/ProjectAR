package pl.arproject.mapper;

import org.springframework.stereotype.Service;
import pl.arproject.friend.invitation.FriendInvitation;
import pl.arproject.friend.invitation.FriendInvitationResponse;
import pl.arproject.game.invitation.GameInvitation;
import pl.arproject.game.invitation.response.GameInvitationResponse;

import java.util.ArrayList;
import java.util.List;

@Service
public class Mapper {

    public List<FriendInvitationResponse> mapFriendInvitations(List<FriendInvitation> invitations) {
        List<FriendInvitationResponse> responses = new ArrayList<>();

        for(FriendInvitation invitation : invitations) {
            FriendInvitationResponse response = new FriendInvitationResponse(
                    invitation.getSender().getUsername());
            responses.add(response);
        }
        return responses;
    }

    public List<GameInvitationResponse> mapGameInvitations(List<GameInvitation> invitations) {
        List<GameInvitationResponse> responses = new ArrayList<>();

        for(GameInvitation invitation : invitations) {
            GameInvitationResponse response = new GameInvitationResponse(
                    invitation.getSender().getUsername(),
                    invitation.getGame(),
                    invitation.getSessionKey()
            );
            responses.add(response);
        }
        return responses;
    }
}

