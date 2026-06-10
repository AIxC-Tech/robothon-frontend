import Window from '../Window'
import { useLang } from '../../context/LangContext'

const AWARDS: { en: string; zh: string; slots: string; amount: string; subtotal: string }[] = [
  { en: '1st Place', zh: '冠军', slots: '1', amount: '3,000', subtotal: '3,000' },
  { en: '2nd Place', zh: '亚军', slots: '1', amount: '1,500', subtotal: '1,500' },
  { en: '3rd Place', zh: '季军', slots: '1', amount: '800', subtotal: '800' },
  { en: 'Excellence Award (4th–8th)', zh: '优秀作品奖（第 4–8 名）', slots: '5', amount: '300', subtotal: '1,500' },
  { en: 'Best Beginner Project', zh: '最佳新手作品', slots: '1', amount: '400', subtotal: '400' },
  { en: 'Best Human-AI Collaboration', zh: '最佳人机协作', slots: '1', amount: '400', subtotal: '400' },
  { en: "Judges' Choice Award", zh: '评审团惊喜奖', slots: '1', amount: '400', subtotal: '400' },
]

export default function PrizesWindow() {
  const { lang, t } = useLang()
  return (
    <Window id="w-prizes" title="prizes.json" bodyClassName="c ctext">
      <div className="winh">{t('Prize Breakdown', '奖金分配')}</div>
      <p style={{ marginBottom: 12 }}>
        {t('Total pool ', '总奖池 ')}
        <b style={{ color: 'var(--ink)' }}>8,000 USDC</b>
        {t(
          ' · 11 prizes in total. Placement prizes are based on total score; special prizes are decided independently by the judges.',
          ' · 共 11 个名额。名次奖按总分排定；特别奖由评审团独立评出。',
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
            <td>11</td>
            <td>—</td>
            <td>8,000</td>
          </tr>
        </tbody>
      </table>
    </Window>
  )
}
