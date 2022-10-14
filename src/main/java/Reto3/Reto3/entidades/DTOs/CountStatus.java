package Reto3.Reto3.entidades.DTOs;

import Reto3.Reto3.entidades.Client;

public class CountStatus {
    private int completed;
    private int cancelled;

    public CountStatus(int completed, int cancelled) {
        this.completed = completed;
        this.cancelled = cancelled;
    }

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }

    public int getCancelled() {
        return cancelled;
    }

    public void setCancelled(int cancelled) {
        this.cancelled = cancelled;
    }
}
