package pl.arproject.friend.invitation;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.arproject.appuser.AppUser;
import pl.arproject.appuser.AppUserService;
import pl.arproject.exception.UserNotFoundException;
import pl.arproject.mapper.Mapper;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;

@Service
@AllArgsConstructor
public class FriendInvitationService {

    private final FriendInvitationRepository friendInvitationRepository;
    private final AppUserService appUserService;
    private final Mapper mapper;

    public boolean existsBySenderAndReceiver(AppUser sender, AppUser receiver) {
        return friendInvitationRepository.existsBySenderAndReceiver(sender, receiver);
    }

    public void saveFriendInvitation(FriendInvitation invitation) {
        friendInvitationRepository.save(invitation);
    }

    public void deleteBySenderAndReceiver(Long senderId, Long receiverId) {
        friendInvitationRepository.deleteBySenderAndReceiver(senderId, receiverId);
    }

    public ResponseEntity<?> getInvitationsByUsername(String username) {
        Optional<AppUser> userFromDb = appUserService.findByUsername(username);

        if(!userFromDb.isPresent()) {
            throw new UserNotFoundException("user not found");
        }

        List<FriendInvitation> invitationsFromDb = friendInvitationRepository
                .findAllByReceiverUsername(userFromDb.get().getUsername());

        List<FriendInvitationResponse> invitations = mapper.mapFriendInvitations(invitationsFromDb);

        return ResponseEntity
                .status(OK)
                .body(invitations);
    }
}


