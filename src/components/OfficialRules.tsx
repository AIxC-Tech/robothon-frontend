import { useLang } from '../context/LangContext'
import LangToggle from './LangToggle'

// ============================================================================
// Robothon 2026 — OFFICIAL RULES (legal version)
// Source of truth: "Robothon 2026 -- Contest Rules.docx".
// The ENGLISH text below is the binding version and is reproduced verbatim,
// EXCEPT two obvious typos corrected from the source (flagged in code review):
//   • "Three will be three AI judges"  → "There will be three AI judges"
//   • "evaluated on the following criteria”" → "...criteria:"
// Bracketed tokens like [DATE] / [CONTEST URL] are UNFILLED placeholders from
// the docx (plan item C-5). They are rendered highlighted so they are obviously
// not yet final. Fill them (and the Privacy Policy URL in App.tsx) before launch.
// ============================================================================

// Where the company Privacy Policy lives. Until legal provides the real URL this
// points at the Privacy section of these rules; see [PRIVACY POLICY URL] below.
const SECTIONS: { id: string; title: string; paras: (string | { ul: string[] })[] }[] = [
  {
    id: 'sponsor',
    title: '1. Sponsor',
    paras: [
      'Faraday Future Intelligent Electric, Inc., d/b/a Faraday Future, is a publicly traded corporation incorporated in the State of Delaware, with its principal place of business is located at 1990 E. Grand Ave., El Segundo, CA, 90245. The Contest is administered solely by Sponsor.',
    ],
  },
  {
    id: 'eligibility',
    title: '2. Eligibility',
    paras: [
      'To enter, participants must meet ALL of the following requirements:',
      {
        ul: [
          'Be a legal resident of the fifty (50) United States or the District of Columbia;',
          'Be at least eighteen (18) years of age (or the age of majority in their state of residence, whichever is greater) at the time of entry;',
          'Have internet access and a valid email address at the time of entry; and',
          'Not be an employee, officer, director, contractor, or agent of Sponsor, its parent companies, subsidiaries, affiliates, advertising and promotion agencies, or prize suppliers, or a member of the immediate family (spouse, parent, child, sibling, or their respective spouses) or household of any such person.',
        ],
      },
      "Corporations, limited liability companies, partnerships, and other legal entities are not eligible to enter. Entries submitted on behalf of another person will be disqualified. Participation constitutes entrant's full and unconditional agreement to these Rules and Sponsor's decisions, which are final and binding in all matters related to the Contest.",
    ],
  },
  {
    id: 'contest-period',
    title: '3. Contest Period',
    paras: [
      'The Contest begins on June 10, 2026, 12:00 AM Pacific Time and ends on June 23, 2026, 12:00 AM Pacific Time (the "Entry Period"). All entries must be received by Sponsor before the end of the Entry Period. Sponsor\'s computer is the official timekeeping device. Entries received after the Entry Period ends are void.',
    ],
  },
  {
    id: 'how-to-enter',
    title: '4. How to Enter',
    paras: [
      'Online Entry. No purchase required. To enter, visit https://robothon.ff.com/ during the Entry Period and complete the entry form by providing your full legal name, email address, state of residence, and any required submission materials (as further described in the Entry Requirements below). Online entry is free and no purchase is required.',
      'Entry Requirements. All entries must include the following:',
      {
        ul: [
          'Completion of all required fields on the entry form;',
          "A statement that the submission is entirely the entrant's own original work, has not been previously published or won a prior award, and does not infringe on any third-party intellectual property rights; and",
          'Affirmative acceptance of these Official Rules.',
        ],
      },
      'Entry Limits. Limit one (1) entry per person per day. Multiple entries from the same person, household, email address, or IP address beyond the stated limit will be void.',
    ],
  },
  {
    id: 'judging',
    title: '5. Judging',
    paras: [
      'AI Panel. All submissions are scored entirely by an LLM, with no human intervention at any stage of scoring. There will be three AI judges (Claude / GPT / Gemini) scoring every entry against one public rubric.',
      'Judging Criteria. Eligible entries will be evaluated on the following criteria:',
      {
        ul: [
          'Runnability — whether the code runs smoothly and is easy to reproduce',
          'Depth of MuJoCo Use — how thoroughly MJCF, physics simulation, collisions, joints, sensors and actuators are used',
          'Task Design — whether the task is clear, challenging and meaningful',
          'Control — teleoperation, autonomous control, policy control, task planning or data-collection capability',
          'Dexterous Manipulation — for dexterous-hand entries: multi-finger coordination, fine manipulation, high-DOF control',
          'Engineering Quality — clarity of code structure, docs, configuration and asset management',
          'Presentation — whether the demo video is intuitive and convincing',
          'Innovation — novelty of the scenario, embodiment, task or application direction',
        ],
      },
      'Winner Determination. The winner is determined purely by the highest rubric score.',
      "Sponsor reserves the right, in its sole discretion, to disqualify any entry that it deems, in its sole judgment, to be offensive, inappropriate, inconsistent with Sponsor's brand guidelines, or otherwise objectionable.",
    ],
  },
  {
    id: 'prizes',
    title: '6. Prizes',
    paras: [
      'Description. Cash prizes will be awarded to the winners. Winner is responsible for all federal, state, and local taxes on the prize value, including California income tax.',
      'Prize Conditions. The following conditions apply to prize acceptance and use:',
      {
        ul: [
          'Prize is non-transferable and must be accepted as awarded;',
          'Sponsor reserves the right to substitute a prize of equal or greater value if the advertised prize becomes unavailable; and',
          'Any unawarded or unclaimed prizes will not be awarded.',
        ],
      },
    ],
  },
  {
    id: 'winner-selection',
    title: '7. Winner Selection and Notification',
    paras: [
      'Potential winners will be selected by June 22, 2026. Sponsor will attempt to notify the potential winner via email within five (5) business days of winner selection. If the potential winner does not respond within seven (7) days of notification, that person will be disqualified and an alternate winner may be selected from remaining qualifying entries.',
      'Winner is required to execute and return an Affidavit of Eligibility, Liability Release, and (where permitted by law) Publicity Release within the time period specified in the notification. Failure to return the required documents within the specified time will result in disqualification and forfeiture of the prize.',
      "Winner's name and state of residence will be made available upon written request to the address in Section 1 within one (1) year of the end of the Entry Period.",
    ],
  },
  {
    id: 'tax',
    title: '8. Tax Obligations and Reporting',
    paras: [
      'Winner is solely responsible for all federal, state, and local taxes on the prize value. Sponsor will comply with all applicable tax reporting requirements. If the prize value is $600 or more, Sponsor will issue an IRS Form 1099-MISC to the winner. Winner must provide a valid taxpayer identification number (via IRS Form W-9 for U.S. persons or IRS Form W-8BEN for non-U.S. persons) prior to receiving the prize.',
      'Sponsor may withhold 24% federal backup withholding from the prize value if the winner fails to provide a valid taxpayer identification number or if required by applicable law.',
    ],
  },
  {
    id: 'ip',
    title: '9. Intellectual Property',
    paras: [
      'Ownership. Entrant retains ownership of the intellectual property rights in their entry, subject to the license granted below.',
      'License Grant. By entering, each entrant grants Sponsor a non-exclusive, royalty-free, worldwide, perpetual license to reproduce, publish, display, distribute, and use the entry for promotional, advertising, and business purposes in any media now known or hereafter devised, without further compensation to the entrant.',
      'Representations and Warranties.',
      {
        ul: [
          'Their entry is entirely their own original work;',
          'Their entry does not infringe any copyright, trademark, trade secret, patent, right of publicity, privacy right, or any other intellectual property or proprietary right of any third party;',
          'Their entry does not contain defamatory content or content that violates any applicable law; and',
          'They have the full right, power, and authority to grant the license described above.',
        ],
      },
    ],
  },
  {
    id: 'general',
    title: '10. General Conditions',
    paras: [
      'Sponsor reserves the right to cancel, suspend, or modify the Contest if any fraud, technical failure, human error, or other factor impairs the integrity or proper operation of the Contest, as determined by Sponsor in its sole discretion. Sponsor reserves the right to disqualify any individual found to be tampering with the entry process or the operation of the Contest.',
      'By participating, entrants agree that Sponsor and its parent companies, subsidiaries, affiliates, partners, advertising and promotional agencies, and their respective officers, directors, employees, and agents (collectively, "Released Parties") are not responsible or liable for any claim, injury, loss, or damage of any kind resulting from participation in the Contest or acceptance or use of any prize. RELEASED PARTIES ARE NOT RESPONSIBLE FOR INCOMPLETE, ILLEGIBLE, MISDIRECTED, DELAYED, LOST, OR CORRUPTED ENTRIES.',
      'The Contest is subject to all applicable federal, state, and local laws and regulations. Void outside the fifty (50) United States and D.C., and where prohibited by law.',
    ],
  },
  {
    id: 'privacy',
    title: '11. Privacy',
    paras: [
      "Information submitted through entry is subject to Sponsor's Privacy Policy, available at https://robothon.ff.com/official-rules. Sponsor is subject to the California Consumer Privacy Act (Cal. Civ. Code § 1798.100 et seq.) and will process personal information of California residents in accordance therewith. By entering, entrants consent to Sponsor's collection and use of personal information as described in the Privacy Policy and these Rules.",
      'Entrant may opt in to receive marketing communications from Sponsor by checking the applicable box on the entry form. Marketing opt-in is entirely voluntary and is not required to enter or win.',
    ],
  },
  {
    id: 'securities',
    title: '12. Securities Law Disclosure',
    paras: [
      "Faraday Future is a publicly traded company. Nothing in these Rules or any Contest materials constitutes investment advice or a recommendation to buy, hold, or sell any security. The Contest is a consumer promotion and is not related to any securities offering or corporate transaction. Participation in the Contest does not create any interest in or right to any security of Faraday Future. Sponsor's employees, officers, and directors must comply with all applicable securities laws and Sponsor's insider trading policy in connection with the Contest.",
    ],
  },
  {
    id: 'dispute',
    title: '13. Dispute Resolution',
    paras: [
      'EXCEPT WHERE PROHIBITED, ENTRANT AGREES THAT ANY AND ALL DISPUTES, CLAIMS, AND CAUSES OF ACTION ARISING OUT OF OR CONNECTED WITH THIS CONTEST OR ANY PRIZE AWARDED SHALL BE RESOLVED INDIVIDUALLY, WITHOUT RESORT TO ANY FORM OF CLASS ACTION, AND EXCLUSIVELY BY FINAL AND BINDING ARBITRATION UNDER THE RULES OF JAMS, CONDUCTED IN LOS ANGELES, CALIFORNIA. ALL ISSUES AND QUESTIONS CONCERNING THE CONSTRUCTION, VALIDITY, INTERPRETATION, AND ENFORCEABILITY OF THESE OFFICIAL RULES SHALL BE GOVERNED BY AND CONSTRUED IN ACCORDANCE WITH THE LAWS OF THE STATE OF CALIFORNIA, WITHOUT GIVING EFFECT TO ANY CHOICE OF LAW OR CONFLICT OF LAW RULES.',
    ],
  },
  {
    id: 'liability',
    title: '14. Limitation of Liability',
    paras: [
      'TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, RELEASED PARTIES WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES ARISING FROM OR IN CONNECTION WITH PARTICIPATION IN THE CONTEST OR ACCEPTANCE, USE, MISUSE, OR INABILITY TO USE ANY PRIZE, EVEN IF SPONSOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.',
    ],
  },
  {
    id: 'availability',
    title: '15. Official Rules Availability',
    paras: [
      'A copy of these Official Rules is available at https://robothon.ff.com/official-rules throughout the Contest Period and for one (1) year thereafter.',
    ],
  },
  {
    id: 'miscellaneous',
    title: '16. Miscellaneous',
    paras: [
      "These Rules constitute the entire agreement between Sponsor and entrant with respect to the Contest and supersede all prior agreements and understandings. If any provision of these Rules is found to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect. Sponsor's failure to enforce any provision of these Rules shall not constitute a waiver of that provision.",
      "These Rules may not be assigned by entrant. Sponsor may assign its rights and obligations under these Rules without entrant's consent.",
    ],
  },
]

// Concise Chinese summary — NOT a clause-by-clause translation. The English
// version above is the binding text (see the disclaimer at the end).
const SUMMARY_ZH: string[] = [
  '主办方：Faraday Future（法拉第未来），美国特拉华州注册的上市公司，赛事由其独立主办。',
  '参赛资格：仅限美国 50 州及哥伦比亚特区的合法居民、年满 18 岁、仅限个人参赛；企业 / 团体及主办方关联人员不可参加。',
  '参赛方式：免费、无需购买；赛期内通过报名页提交，需提供真实法定姓名、邮箱、居住州；每人每天限报名 1 次。',
  '评审：全部由 AI 评分（Claude / GPT / Gemini 三位 AI 评委），无人工干预，按统一公开评分标准打分；得分最高者获胜。',
  '奖金与税务：现金奖励；获奖者自行承担全部税费；单项奖额达 $600 及以上将收到 IRS 1099-MISC 表；未提供有效纳税识别号可能被预扣 24%。',
  '知识产权：作品所有权归参赛者；但参赛即授予主办方一项非独占、全球、永久、免版税的使用许可（用于宣传、广告与业务用途）。',
  '隐私：个人信息按主办方隐私政策处理，并遵守加州 CCPA。',
  '争议解决：适用加州法律，争议以在洛杉矶进行的 JAMS 仲裁个别解决，放弃集体诉讼。',
  '责任限制：在法律允许范围内，主办方不对间接、附带、特殊或惩罚性损失承担责任。',
  '规则可用性：本规则在赛期内及赛后 1 年内持续可访问。',
]

const PLACEHOLDER_SPLIT = /(\[[A-Z][A-Z ]*\])/g
const PLACEHOLDER_TEST = /^\[[A-Z][A-Z ]*\]$/

/** Render text, wrapping unfilled [PLACEHOLDER] tokens in a highlighted mark. */
function withPlaceholders(text: string) {
  return text.split(PLACEHOLDER_SPLIT).map((part, i) =>
    PLACEHOLDER_TEST.test(part) ? (
      <mark className="rules-ph" key={i} title="Unfilled placeholder — fill before launch">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export default function OfficialRules() {
  const { t } = useLang()
  return (
    <div className="rules-page">
      <div className="rules-topbar">
        <a className="rules-home" href="/">
          {t('← Back to home', '← 返回首页')}
        </a>
        <LangToggle />
      </div>

      <header className="rules-header">
        <div className="rules-kicker">Faraday Future · Robothon 2026</div>
        <h1>{t('Official Rules', '官方规则')}</h1>
        <div className="rules-eff">{withPlaceholders('Effective June 10, 2026, 12:00 AM Pacific Time')}</div>
        <p className="rules-nopurchase">NO PURCHASE NECESSARY TO ENTER OR WIN. VOID WHERE PROHIBITED BY LAW.</p>
        <p>
          These Official Rules ("Rules") govern the Robothon 2026 (the "Contest") sponsored by Faraday Future
          ("Sponsor"). By entering the Contest, you agree to these Rules and the decisions of the Sponsor, which are
          final and binding in all matters related to the Contest.
        </p>
        <button type="button" className="rules-print" onClick={() => window.print()}>
          {t('⤓ Download / Print PDF', '⤓ 下载 / 打印 PDF')}
        </button>
      </header>

      {/* Chinese summary — collapsible, reference only */}
      <details className="rules-summary" open>
        <summary>{t('中文摘要 (Chinese summary)', '中文摘要')}</summary>
        <ul>
          {SUMMARY_ZH.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
        <p className="rules-disclaimer">本中文摘要仅供参考，完整条款以英文版《Official Rules》为准。</p>
      </details>

      {/* Anchor table of contents */}
      <nav className="rules-toc" aria-label={t('Contents', '目录')}>
        <div className="rules-toc-h">{t('Contents', '目录')}</div>
        <ol>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.title}</a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Full English text (binding version) */}
      <main className="rules-body">
        {SECTIONS.map((s) => (
          <section id={s.id} key={s.id}>
            <h2>{s.title}</h2>
            {s.paras.map((p, i) =>
              typeof p === 'string' ? (
                <p key={i}>{withPlaceholders(p)}</p>
              ) : (
                <ul key={i}>
                  {p.ul.map((li, j) => (
                    <li key={j}>{withPlaceholders(li)}</li>
                  ))}
                </ul>
              ),
            )}
          </section>
        ))}
      </main>

      <footer className="rules-foot">
        {t('© 2026 FFAI Robothon · Embodied-AI Hackathon', '© 2026 FFAI Robothon · 具身智能黑客松')}
      </footer>
    </div>
  )
}
