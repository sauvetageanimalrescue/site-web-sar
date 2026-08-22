// Les douze épisodes de la première saison de Sauvetage animal, dans l'ordre
// de diffusion. L'ordre de la liste de lecture YouTube ne correspond pas à
// la numérotation des épisodes: c'est le numéro qui fait foi ici.
export type Episode = { numero: number; video: string };

export const PLAYLISTE = "PLE_KP_0M-94hOB0jQZCYTHP3b1IOoC1D6";

export const EPISODES: Episode[] = [
  { numero: 1, video: "6FIsdAzzrd4" },
  { numero: 2, video: "bN6w37k6C9Y" },
  { numero: 3, video: "SCjqAR1hjmY" },
  { numero: 4, video: "kNTqlESCoQw" },
  { numero: 5, video: "VR-i-k2K0Wg" },
  { numero: 6, video: "nxxHisZ0k38" },
  { numero: 7, video: "Qndnn_qM_LM" },
  { numero: 8, video: "lOuQIrCLPSA" },
  { numero: 9, video: "qK3eBNV6MHs" },
  { numero: 10, video: "c_b2t98OqN4" },
  { numero: 11, video: "BKN2691HFNw" },
  { numero: 12, video: "cp_-kUVPwU4" },
];

// La vignette servie par YouTube. Le format hqdefault existe pour toutes les
// vidéos, contrairement à maxresdefault.
export function vignette(video: string) {
  return `https://i.ytimg.com/vi/${video}/hqdefault.jpg`;
}

export function lienEpisode(video: string) {
  return `https://www.youtube.com/watch?v=${video}&list=${PLAYLISTE}`;
}
