import { useLang } from '../context/LangContext'

/** EN / 中 language switch. `id` lets the same control be placed in several spots. */
export default function LangToggle({ id }: { id?: string }) {
  const { lang, toggle } = useLang()
  return (
    <div id={id} className="langtoggle" onClick={toggle}>
      {lang === 'en' ? (
        <>
          <b>EN</b> / 中
        </>
      ) : (
        <>
          <b>中</b> / EN
        </>
      )}
    </div>
  )
}
