export type AttendeeProfile = {
  id: number;
  full_name: string | null;
  job_title: string | null;
  workplace: string | null;
  linkedin_url: string | null;
  photo_url: string | null;
};

type AuthResponse = {
  token: string;
  profile: AttendeeProfile;
};

type MeResponse = {
  profile: AttendeeProfile;
};

type AttendeesResponse = {
  attendees: AttendeeProfile[];
};

type ApiError = {
  error: string;
};

const TOKEN_KEY = "ces_networking_token";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api";

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function hasStoredToken(): boolean {
  return Boolean(getStoredToken());
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  auth = false,
): Promise<T> {
  const headers = new Headers(options.headers ?? {});

  if (auth) {
    const token = getStoredToken();
    if (!token) {
      throw new Error("No autorizado.");
    }
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = (await response.json()) as T & ApiError;

  if (!response.ok) {
    throw new Error(data.error ?? "Ocurrió un error inesperado.");
  }

  return data;
}

export async function register(
  ticketNumber: string,
  password: string,
): Promise<AttendeeProfile> {
  const data = await apiFetch<AuthResponse>("/register.php", {
    method: "POST",
    body: JSON.stringify({ ticket_number: ticketNumber, password }),
  });
  saveToken(data.token);
  return data.profile;
}

export async function login(
  ticketNumber: string,
  password: string,
): Promise<AttendeeProfile> {
  const data = await apiFetch<AuthResponse>("/login.php", {
    method: "POST",
    body: JSON.stringify({ ticket_number: ticketNumber, password }),
  });
  saveToken(data.token);
  return data.profile;
}

export async function fetchMe(): Promise<AttendeeProfile> {
  const data = await apiFetch<MeResponse>("/me.php", { method: "GET" }, true);
  return data.profile;
}

export async function updateProfile(input: {
  full_name: string;
  job_title: string;
  workplace: string;
  linkedin_url: string;
}): Promise<AttendeeProfile> {
  const data = await apiFetch<MeResponse>(
    "/profile.php",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    true,
  );
  return data.profile;
}

export async function uploadPhoto(file: File): Promise<AttendeeProfile> {
  const formData = new FormData();
  formData.append("photo", file);

  const data = await apiFetch<MeResponse>(
    "/upload.php",
    {
      method: "POST",
      body: formData,
    },
    true,
  );
  return data.profile;
}

export async function listAttendees(): Promise<AttendeeProfile[]> {
  const data = await apiFetch<AttendeesResponse>(
    "/attendees.php",
    { method: "GET" },
    true,
  );
  return data.attendees;
}

export function logout(): void {
  clearToken();
}
