package pl.arproject.friend;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.arproject.appuser.AppUser;
import pl.arproject.appuser.AppUserService;
import pl.arproject.exception.UserAlreadyInvitedException;
import pl.arproject.exception.UserNotFoundException;
import pl.arproject.exception.UsersAreAlreadyFriendsException;
import pl.arproject.friend.invitation.FriendInvitation;
import pl.arproject.friend.invitation.FriendInvitationRequest;
import pl.arproject.friend.invitation.FriendInvitationService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;

@Service
@AllArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final AppUserService appUserService;
    private final FriendInvitationService friendInvitationService;

    public ResponseEntity<?> sendInvitationToFriends(FriendInvitationRequest request) {
        Optional<AppUser> senderFromDb = appUserService
                .findByUsername(request.getSenderUsername());

        Optional<AppUser> receiverFromDb = appUserService
                .findByUsername(request.getReceiverUsername());

        if(!senderFromDb.isPresent() || !receiverFromDb.isPresent()) {
            throw new UserNotFoundException("user not found");
        }

        AppUser sender = senderFromDb.get();
        AppUser receiver = receiverFromDb.get();

        boolean areAlreadyFriends =
                friendRepository.existsByFirstUserAndSecondUser(sender, receiver) ||
                friendRepository.existsByFirstUserAndSecondUser(receiver, sender);

        if(areAlreadyFriends) {
            throw new UsersAreAlreadyFriendsException("you are already friends");
        }

        boolean alreadyInvitedThisUser = friendInvitationService
                .existsBySenderAndReceiver(sender, receiver);

        if(alreadyInvitedThisUser) {
            throw new UserAlreadyInvitedException(
                    "you already invited " + receiver.getUsername() + " to friends");
        }

        boolean thisUserAlreadyInvitedMe = friendInvitationService
                .existsBySenderAndReceiver(receiver, sender);

        if(thisUserAlreadyInvitedMe) {
            throw new UserAlreadyInvitedException(
                    receiver.getUsername() + " already invited you to friends");
        }

        FriendInvitation invitation = new FriendInvitation(sender, receiver);
        friendInvitationService.saveFriendInvitation(invitation);

        return ResponseEntity
                .status(CREATED)
                .body("invitation has been sent to " + receiver.getUsername());
    }

    @Transactional
    public ResponseEntity<?> acceptInvitation(FriendInvitationRequest request) {
        AppUser sender = appUserService.findByUsername(request.getSenderUsername()).get();
        AppUser receiver = appUserService.findByUsername(request.getReceiverUsername()).get();

        Friend friend = new Friend(sender, receiver);
        friendRepository.save(friend);

        friendInvitationService.deleteBySenderAndReceiver(sender.getId(), receiver.getId());

        return ResponseEntity
                .status(OK)
                .body("invitation accepted");
    }

    @Transactional
    public ResponseEntity<?> declineInvitation(FriendInvitationRequest request) {
        AppUser sender = appUserService.findByUsername(request.getSenderUsername()).get();
        AppUser receiver = appUserService.findByUsername(request.getReceiverUsername()).get();

        friendInvitationService.deleteBySenderAndReceiver(sender.getId(), receiver.getId());

        return ResponseEntity
                .status(OK)
                .body("invitation declined");
    }

    public ResponseEntity<?> getAllFriends(String username) {
        Optional<AppUser> userFromDb = appUserService.findByUsername(username);

        if(!userFromDb.isPresent()) {
            throw new UserNotFoundException("user not found");
        }

        AppUser user = userFromDb.get();
        List<AppUser> friends = findAllFriendsFromDb(user.getId());

        return ResponseEntity
                .status(OK)
                .body(friends);
    }

    private List<AppUser> findAllFriendsFromDb(Long id) {
        List<AppUser> firstPartOfFriends = friendRepository
                .findSecondUserByFirstUserId(id);

        List<AppUser> secondPartOfFriends = friendRepository
                .findFirstUserBySecondUserId(id);

        List<AppUser> friends = new ArrayList<>();
        friends.addAll(firstPartOfFriends);
        friends.addAll(secondPartOfFriends);

        return friends;
    }
}
