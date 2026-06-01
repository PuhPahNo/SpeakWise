import { redirect } from 'next/navigation';

// The freestyle "Talk" surface was folded into Home — the command-center
// orb now carries the spoken conversation (with a running transcript) and a
// Voice/Chat toggle. Keep this route as a redirect so old links/bookmarks
// still land somewhere sensible.
export default function TalkPage() {
  redirect('/command-center');
}
