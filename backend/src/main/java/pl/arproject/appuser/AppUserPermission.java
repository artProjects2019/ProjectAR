package pl.arproject.appuser;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AppUserPermission {
    WEBSITE_READ("website:read"),
    WEBSITE_WRITE("website:write");

    private final String permission;
}
