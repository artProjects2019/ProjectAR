package pl.arproject.game.invitation;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.arproject.appuser.AppUser;
import pl.arproject.appuser.AppUserService;
import pl.arproject.exception.UserNotFoundException;
import pl.arproject.game.invitation.response.GameInvitationResponse;
import pl.arproject.mapper.Mapper;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.OK;

@Service
@AllArgsConstructor
public class GameInvitationService {

    private final GameInvitationRepository gameInvitationRepository;
    private final Mapper mapper;
    private final AppUserService appUserService;

    public void saveGameInvitation(GameInvitation invitation) {
        gameInvitationRepository.save(invitation);
    }

    public Optional<GameInvitation> findBySessionkey(String sessionKey) {
        return gameInvitationRepository.findBySessionKey(sessionKey);
    }

    public void deleteBySessionKey(String sessionKey) {
        gameInvitationRepository.deleteBySessionKey(sessionKey);
    }

    public ResponseEntity<?> getInvitationsByUsername(String username) {
        Optional<AppUser> userFromDb = appUserService.findByUsername(username);

        if(!userFromDb.isPresent()) {
            throw new UserNotFoundException("user not found");
        }

        List<GameInvitation> invitationsFromDb = gameInvitationRepository
                .findAllByReceiverUsername(userFromDb.get().getUsername());

        List<GameInvitationResponse> invitations = mapper.mapGameInvitations(invitationsFromDb);

        return ResponseEntity
                .status(OK)
                .body(invitations);
    }
}
