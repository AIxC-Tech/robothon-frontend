import Window from '../Window'

const SNIP = `$ pip install mujoco
>> resolving mujoco-3.x ... ok
$ python sim/train.py --robot dexhand --task pick_place
[mjcf] loading scene assets/arena.xml
[mjcf] 248 bodies · 96 joints · 32 actuators · 14 sensors
[phys] contact solver: PGS  timestep=0.002
[ctrl] teleop bridge online  ::  port_6667
[roll] reward=  0.0421  ->  0.6688  ->  0.9134
[bin ] 2048 samples  sigma_r=22.16
[ckpt] saving policy_0xA3F1.pt ... done
>> deploy --leaderboard --anon
`

export default function TerminalWindow() {
  return (
    <Window id="w-term" title="root@ffai:~# ./run_mujoco.sh">
      <div id="termlog">
        {SNIP}
        <span className="cur">▋</span>
      </div>
    </Window>
  )
}
