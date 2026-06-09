import Window from '../Window'

export default function DexHandWindow() {
  return (
    <Window id="w-dexhand" title="dexterous_hand_demo.mp4" className="vidwin">
      <video src="/dexhand_demo.mp4" autoPlay muted loop playsInline controls />
    </Window>
  )
}
