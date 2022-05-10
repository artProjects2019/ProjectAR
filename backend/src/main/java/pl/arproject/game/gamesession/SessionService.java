package pl.arproject.game.gamesession;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.arproject.appuser.AppUser;
import pl.arproject.appuser.AppUserService;
import pl.arproject.game.gamesession.request.SessionCloseRequest;
import pl.arproject.game.gamesession.request.SessionCreateRequest;
import pl.arproject.game.gamesession.response.SessionCreateResponse;
import pl.arproject.game.invitation.GameInvitation;
import pl.arproject.game.invitation.GameInvitationService;
import pl.arproject.game.invitation.request.GameInvitationAcceptRequest;
import pl.arproject.game.invitation.request.GameInvitationDeclineRequest;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@AllArgsConstructor
@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final AppUserService appUserService;
    private final GameInvitationService gameInvitationService;

    @Transactional
    public ResponseEntity<?> createNewSession(SessionCreateRequest request) {
        AppUser firstPlayer = appUserService.findByUsername(request.getFirstPlayerUsername()).get();
        AppUser secondPlayer = appUserService.findByUsername(request.getSecondPlayerUsername()).get();

        String sessionKey = UUID.randomUUID().toString();

        Session session = new Session(sessionKey, firstPlayer);
        sessionRepository.save(session);

        GameInvitation invitation = new GameInvitation(firstPlayer, secondPlayer, request.getGame(), sessionKey);
        gameInvitationService.saveGameInvitation(invitation);

        SessionCreateResponse response = new SessionCreateResponse(sessionKey);

        return ResponseEntity
                .status(CREATED)
                .body(response);
    }

    @Transactional
    public ResponseEntity<?> acceptInvitation(GameInvitationAcceptRequest request) {
        AppUser secondPlayer = appUserService.findByUsername(request.getReceiverUsername()).get();

        Session session = sessionRepository.findBySessionKey(request.getSessionKey()).get();
        session.setSecondPlayer(secondPlayer);

        sessionRepository.save(session);
        gameInvitationService.deleteBySessionKey(session.getSessionKey());

        return ResponseEntity
                .status(OK)
                .body("invitation accepted");
    }

    @Transactional
    public ResponseEntity<?> declineInvitation(String sessionKey) {
        gameInvitationService.deleteBySessionKey(sessionKey);
        sessionRepository.deleteBySessionKey(sessionKey);

        return ResponseEntity
                .status(OK)
                .body("invitation declined");
    }

    @Transactional
    public ResponseEntity<?> closeSession(SessionCloseRequest request) {
        Optional<GameInvitation> invitation = gameInvitationService.findBySessionkey(request.getSessionKey());

        if(invitation.isPresent()) {
            gameInvitationService.deleteBySessionKey(request.getSessionKey());
        }

        sessionRepository.deleteBySessionKey(request.getSessionKey());

        return ResponseEntity
                .status(OK)
                .body("session has been deleted");
    }
}



