export default function StickyMobileCTA() {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#000', color: '#fff', padding: '12px',
      textAlign: 'center', zIndex: 9999, fontSize: '18px'
    }}>
      📩 <a href="/join" style={{ color: '#00ffcc' }}>Get Job Leads — Join Fixlo</a>
    </div>
  );
}
