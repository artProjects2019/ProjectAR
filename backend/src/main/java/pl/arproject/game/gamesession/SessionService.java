package pl.arproject.game.gamesession;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.arproject.appuser.AppUser;
import pl.arproject.appuser.AppUserService;
import pl.arproject.email.InvitationToSessionEmailService;
import pl.arproject.exception.NotInvitedToSessionException;
import pl.arproject.exception.SessionNotFoundException;
import pl.arproject.exception.UserNotFoundException;
import pl.arproject.game.gamesession.request.SessionCloseRequest;
import pl.arproject.game.gamesession.request.SessionCreateRequest;
import pl.arproject.game.gamesession.request.SessionInviteRequest;
import pl.arproject.game.gamesession.request.SessionJoinRequest;
import pl.arproject.game.gamesession.response.SessionResponse;

import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@AllArgsConstructor
@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final AppUserService appUserService;
    private final InvitationToSessionEmailService invitationToSessionEmailService;

    public ResponseEntity<?> createNewSession(SessionCreateRequest request) {
        Optional<AppUser> playerFromDb = appUserService
                .findByUsername(request.getUsername());

        if(!playerFromDb.isPresent()) {
            throw new UserNotFoundException("user not found");
        }

        AppUser firstPlayer = playerFromDb.get();
        String sessionKey = UUID.randomUUID().toString();

        Session session = new Session(sessionKey, firstPlayer);
        sessionRepository.save(session);

        SessionResponse response = new SessionResponse(sessionKey);

        return ResponseEntity
                .status(CREATED)
                .body(response);
    }

    public ResponseEntity<?> joinSession(SessionJoinRequest request) {
        Optional<Session> sessionFromDb = sessionRepository
                .findBySessionKey(request.getSessionKey());

        if(!sessionFromDb.isPresent()) {
            throw new SessionNotFoundException("session not found");
        }

        Session session = sessionFromDb.get();

        Optional<AppUser> playerFromDb = appUserService
                .findByUsername(request.getUsername());

        if(!playerFromDb.isPresent()) {
            throw new UserNotFoundException("user not found");
        }

        AppUser secondPlayer = playerFromDb.get();

        if(!secondPlayer.getUsername().equals(session.getExpectedPlayerUsername())) {
            throw new NotInvitedToSessionException("you are not invited to this session");
        }

        session.setSecondPlayer(secondPlayer);
        sessionRepository.save(session);

        SessionResponse response = new SessionResponse(request.getSessionKey());

        return ResponseEntity
                .status(OK)
                .body(response);
    }

    public ResponseEntity<?> inviteToSession(SessionInviteRequest request) {
        AppUser invitedUser = appUserService.findByUsername(request.getToUsername()).get();
        Session session = sessionRepository.findBySessionKey(request.getSessionKey()).get();

        session.setExpectedPlayerUsername(invitedUser.getUsername());
        sessionRepository.save(session);
        invitationToSessionEmailService.createAndSendEmail(
                invitedUser.getEmail(),
                invitedUser.getUsername(),
                request.getFromUsername(),
                session.getSessionKey()
        );

        return ResponseEntity
                .status(OK)
                .body("invitation has been sent to " + invitedUser.getUsername());
    }

    @Transactional
    public ResponseEntity<?> closeSession(SessionCloseRequest request) {
        sessionRepository.deleteBySessionKey(request.getSessionKey());

        return ResponseEntity
                .status(OK)
                .body("session has been deleted");
    }
}




