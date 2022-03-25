package pl.arproject.repository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import pl.arproject.entity.User;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void itShouldFindUserByUsername() {
        // given
        String username = "marcin";

        User user = new User(
                username,
                "password12",
                "marcin@gmail.com"
        );

        underTest.save(user);

        // when
        boolean expected = underTest.findByUsername(username).isPresent();

        // then
        assertThat(expected).isTrue();
    }

    @Test
    void itShouldNotFindUserByUsername() {
        // given
        String username = "marcin";

        User user = new User(
                "different_username",
                "password12",
                "marcin@gmail.com"
        );

        underTest.save(user);

        // when
        boolean expected = underTest.findByUsername(username).isPresent();

        // then
        assertThat(expected).isFalse();
    }

    @Test
    void itShouldFindUserByEmail() {
        // given
        String email = "marcin@gmail.com";

        User user = new User(
                "marcin",
                "password12",
                email
        );

        underTest.save(user);

        // when
        boolean expected = underTest.findByEmail(email).isPresent();

        // then
        assertThat(expected).isTrue();
    }

    @Test
    void itShouldNotFindUserByEmail() {
        // given
        String email = "marcin@gmail.com";

        User user = new User(
                "marcin",
                "password12",
                "different_email"
        );

        underTest.save(user);

        // when
        boolean expected = underTest.findByEmail(email).isPresent();

        // then
        assertThat(expected).isFalse();
    }

    @Test
    void itShouldFindUserByUsernameOrEmailCaseBothCorrect() {
        // given
        String username = "marcin";
        String email = "marcin@gmail.com";

        User user = new User(
                username,
                "password12",
                email
        );

        underTest.save(user);

        // when
        boolean expected = underTest.findByUsernameOrEmail(username, email).isPresent();

        // then
        assertThat(expected).isTrue();
    }

    @Test
    void itShouldFindUserByUsernameOrEmailCaseUsernameCorrect() {
        // given
        String username = "marcin";
        String email = "marcin@gmail.com";

        User user = new User(
                username,
                "password12",
                "different_email"
        );

        underTest.save(user);

        // when
        boolean expected = underTest.findByUsernameOrEmail(username, email).isPresent();

        // then
        assertThat(expected).isTrue();

    }

    @Test
    void itShouldFindUserByUsernameOrEmailCaseEmailCorrect() {
        // given
        String username = "marcin";
        String email = "marcin@gmail.com";

        User user = new User(
                "different_username",
                "password12",
                email
        );

        underTest.save(user);

        // when
        boolean expected = underTest.findByUsernameOrEmail(username, email).isPresent();

        // then
        assertThat(expected).isTrue();
    }


    @Test
    void itShouldNotFindUserByUsernameNorEmail() {
        // given
        String username = "marcin";
        String email = "marcin@gmail.com";

        User user = new User(
                "different_username",
                "password12",
                "different_email"
        );

        underTest.save(user);

        // when
        boolean expected = underTest.findByUsernameOrEmail(username, email).isPresent();

        // then
        assertThat(expected).isFalse();
    }
}