import Window from '../Window'
import { useLang } from '../../context/LangContext'

const AWARDS: { en: string; zh: string; slots: string; amount: string; subtotal: string }[] = [
  { en: '1st Place', zh: '冠军', slots: '1', amount: '1,500', subtotal: '1,500' },
  { en: '2nd Place', zh: '亚军', slots: '1', amount: '599', subtotal: '599' },
  { en: '3rd Place', zh: '季军', slots: '1', amount: '550', subtotal: '550' },
  { en: 'Excellence Award (4th–11th)', zh: '优秀作品奖（第 4–11 名）', slots: '8', amount: '500', subtotal: '4,000' },
  { en: 'Best Beginner Project', zh: '最佳新手作品', slots: '1', amount: '450', subtotal: '450' },
  { en: 'Best Human-AI Collaboration', zh: '最佳人机协作', slots: '1', amount: '450', subtotal: '450' },
  { en: "Judges' Choice Award", zh: '评审团之选', slots: '1', amount: '450', subtotal: '450' },
]

export default function PrizesWindow() {
  const { lang, t } = useLang()
  return (
    <Window id="w-prizes" title="prizes.json" bodyClassName="c ctext">
      <div className="winh">{t('Prize Breakdown', '奖金分配')}</div>
      <p style={{ marginBottom: 12 }}>
        {t('Total pool ', '总奖池 ')}
        <b style={{ color: 'var(--ink)' }}>7,999 USDC</b>
        {t(
          ' · 14 prizes in total. Placement prizes are based on total score; special prizes are decided independently by the judges.',
          ' · 共 14 个名额。名次奖按总分排定；特别奖由评审团独立评出。',
        )}
      </p>
      <table>
        <thead>
          <tr>
            <th>{t('Award', '奖项')}</th>
            <th>{t('Slots', '名额')}</th>
            <th>{t('Amount', '金额')}</th>
            <th>{t('Subtotal', '小计')}</th>
          </tr>
        </thead>
        <tbody>
          {AWARDS.map((a, i) => (
            <tr key={i}>
              <td>{lang === 'zh' ? a.zh : a.en}</td>
              <td>{a.slots}</td>
              <td className="a">{a.amount}</td>
              <td>{a.subtotal}</td>
            </tr>
          ))}
          <tr className="tot">
            <td>{t('Total', '合计')}</td>
            <td>14</td>
            <td>—</td>
            <td>7,999</td>
          </tr>
        </tbody>
      </table>
    </Window>
  )
}
