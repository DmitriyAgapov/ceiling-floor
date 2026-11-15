'use client';

import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight, ArrowRight, Phone, MapPin, Droplets, Scissors, RefreshCw, Sparkles, Check, X, Menu, Plus, ShieldCheck, CircleAlert} from 'lucide-react';
import site from '@/data/site.json';
import services from '@/data/services.json';
import faq from '@/data/faq.json';
import content from '@/data/content.json';
import projects from '@/data/projects.json';
import prices from '@/data/prices.json';
import hero from '@/data/hero.json';
import installation from '@/data/installation.json';

const icons = {droplets:Droplets,scissors:Scissors,refresh:RefreshCw,sparkles:Sparkles};
const tel = `tel:${site.phone}`;

export default function Website(){
 const [menu,setMenu]=useState(false);
 const [active,setActive]=useState<(typeof services)[number]|null>(null);
 const [situation,setSituation]=useState('water');
 const [city,setCity]=useState(site.cities[0]);
 const [showResult,setShowResult]=useState(false);
 const [heroView,setHeroView]=useState<'problem'|'solution'>('problem');
 const [installationView,setInstallationView]=useState<'before'|'after'>('after');
 const dialog=useRef<HTMLDialogElement>(null);
 const closeButton=useRef<HTMLButtonElement>(null);
 useEffect(()=>{ if(active){dialog.current?.showModal();closeButton.current?.focus();} },[active]);
 const close=()=>{dialog.current?.close();setActive(null);};
 const selected=services.find(s=>s.id===situation);
 const links=[['Услуги','#services'],['Примеры работ','#projects'],['Как работаем','#process'],['Вопросы','#faq']];
 return <>
  <a className="skip-link" href="#main">Перейти к содержанию</a>
  <div className="demo-bar"><span className="demo-dot"/>Демонстрационная версия<span className="demo-extra"> · Номер, цены и примеры работ — тестовые</span></div>
  <header className="header wrap">
   <a className="brand" href="#" aria-label="Ремонт потолков — на главную"><span className="brand-symbol"><span/></span><span>РЕМОНТ<span className="brand-second">ПОТОЛКОВ<span className="brand-period">.</span></span></span></a>
   <nav className="desktop-nav" aria-label="Основная навигация">{links.map(([label,url])=><a key={url} href={url}>{label}</a>)}</nav>
   <a className="header-call" href={tel}><Phone size={16}/><span>{site.phoneDisplay}<small>Тестовый номер</small></span></a>
   <button className="menu-button" aria-label={menu?'Закрыть меню':'Открыть меню'} aria-expanded={menu} aria-controls="mobile-menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
  </header>
  {menu&&<nav id="mobile-menu" className="mobile-nav" aria-label="Мобильная навигация">{links.map(([label,url])=><a key={url} href={url} onClick={()=>setMenu(false)}>{label}<ArrowUpRight size={18}/></a>)}</nav>}
  <main id="main">
   <section className="hero wrap hero-redesign" aria-labelledby="hero-title">
    <div className="hero-copy">
     <div className="hero-location"><MapPin size={16}/><span className="hero-city-list">{site.cities.join(' · ')}</span><span className="hero-location-category">РЕМОНТ И МОНТАЖ</span></div>
     <p className="eyebrow hero-category">{hero.eyebrow}</p>
     <h1 id="hero-title"><span className="hero-question">{hero.question}</span>{hero.title}<br/><span className="serif orange hero-accent">{hero.accent}<svg viewBox="0 0 300 18" fill="none" aria-hidden="true"><path d="M3 12C75 1 191 0 295 8M18 17C110 7 215 6 278 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span></h1>
     <p className="hero-description">{hero.description}</p>
     <div className="hero-actions"><a className="button primary" href={tel}><Phone size={18}/>{hero.callLabel}<ArrowUpRight size={19}/></a><a className="text-link" href="#assessment">{hero.secondaryLabel}<ArrowRight size={17}/></a></div>
     <div className="hero-problem-links" aria-label="Популярные услуги">{hero.services.map(s=><button key={s.id} onClick={()=>setActive(services.find(service=>service.id===s.id)||null)}>{s.label}<ArrowUpRight size={13}/></button>)}</div>
     <div className="hero-proof"><ShieldCheck size={22}/><span>Сначала осмотр и согласование стоимости.<br/><strong>Подберём решение под вашу ситуацию.</strong></span></div>
    </div>
    <div className="hero-story">
     <div className={`hero-visual hero-comparison ${heroView==='solution'?'is-solution':''}`}>
      <div className="hero-scene-crop"><img className="hero-scene-image" src={hero.image} alt={hero[heroView].alt} width={hero.imageWidth} height={hero.imageHeight} fetchPriority="high"/></div>
      <div className="hero-view-controls" role="group" aria-label="Показать проблему или решение">{hero.tabs.map(t=><button key={t.id} aria-pressed={heroView===t.id} onClick={()=>setHeroView(t.id as 'problem'|'solution')}><span/>{t.label}</button>)}</div>
      <span className="hero-scene-counter" aria-hidden="true">{heroView==='problem'?'01':'02'} / 02</span>
      <div className="hero-damage-marker" aria-hidden="true"><span className="marker-dot"/><span>{heroView==='problem'?'Вода под полотном':'Ровный потолок'}</span></div>
      <div className="hero-story-caption" aria-live="polite"><span className="hero-story-icon">{heroView==='problem'?<Droplets size={25}/>:<Check size={25}/>}</span><div><span className="tiny-label">{hero[heroView].label}</span><h2>{hero[heroView].title}</h2><p>{hero[heroView].description}</p></div><button className="hero-next-scene" onClick={()=>setHeroView(heroView==='problem'?'solution':'problem')} aria-label={heroView==='problem'?'Показать возможный результат':'Показать проблему'}><ArrowUpRight size={24}/></button></div>
      <span className="hero-image-label">{hero.imageLabel}</span>
     </div>

    </div>
   </section>
   <div className="service-strip wrap"><span><Droplets/>Слив воды после залива</span><span><Scissors/>Порезы и разрывы</span><span><RefreshCw/>Восстановление полотна</span><span><Sparkles/>Монтаж нового потолка</span></div>

   <section className="section wrap" id="services">
    <div className="section-top"><div><p className="eyebrow">01 / ЧЕМ ПОМОЖЕМ</p><h2>У каждой проблемы<br/>есть <span className="serif">своё решение.</span></h2></div></div>
    <div className="services-grid">{services.map(s=>{const Icon=icons[s.icon as keyof typeof icons];return <button className="service-card" key={s.id} onClick={()=>setActive(s)} aria-label={`Подробнее: ${s.title}`}><div className="service-card-top"><span className="service-icon"><Icon size={28} strokeWidth={1.5}/></span><span className="card-number">/{s.number}</span></div><h3>{s.title}</h3><p>{s.description}</p><span className="card-bottom"><span>{s.tag}</span><ArrowUpRight size={23}/></span></button>})}</div>
   </section>

   <section className="urgent wrap" aria-labelledby="urgent-title"><div className="urgent-icon"><Droplets size={43} strokeWidth={1.4}/></div><div className="urgent-copy"><p className="eyebrow">ЕСЛИ ЗАТОПИЛИ СОСЕДИ</p><h2 id="urgent-title">Вода под потолком?<br/><span className="serif">Не откладывайте звонок.</span></h2><p>Не прокалывайте и не нагревайте полотно самостоятельно.<br/>Сообщите о заливе — обсудим дальнейшие действия и время выезда.</p></div><div className="urgent-action"><a className="button cream" href={tel}><Phone size={18}/>Обсудить срочный слив<ArrowUpRight size={18}/></a><span>{site.cities.join(' · ')}</span></div></section>

   <section className="section wrap assessment" id="assessment"><div><p className="eyebrow">НАЧНЁМ С ВАШЕЙ СИТУАЦИИ</p><h2>Что случилось<br/><span className="serif">с потолком?</span></h2><p className="muted">Выберите проблему — подскажем,<br/>что стоит обсудить с мастером.</p></div><div className="assessment-panel"><div className="field"><label htmlFor="situation">Какая помощь нужна?</label><select id="situation" value={situation} onChange={e=>{setSituation(e.target.value);setShowResult(false);}}>{services.map(s=><option key={s.id} value={s.id}>{s.title}</option>)}<option value="installation">Новый потолок / перетяжка</option></select></div><div className="field"><label htmlFor="city">В каком городе?</label><select id="city" value={city} onChange={e=>{setCity(e.target.value);setShowResult(false);}}>{site.cities.map(c=><option key={c}>{c}</option>)}</select></div><button className="button primary" onClick={()=>setShowResult(true)}>Посмотреть рекомендацию<ArrowUpRight size={18}/></button>{showResult&&<div className="assessment-result" role="status"><strong>{city} · {selected?.title||'Монтаж и перетяжка'}</strong><p>{selected?.details||'Обсудите с мастером размеры помещения, материал полотна и расположение светильников. После оценки можно согласовать монтаж или замену существующего потолка.'}</p><a href={tel}>Обсудить с мастером <ArrowUpRight size={16}/></a></div>}</div></section>

   <section className="installation installation-redesign" id="installation" aria-labelledby="installation-title"><div className="wrap installation-inner">
    <div className="installation-story">
     <div className={`hero-visual installation-comparison ${installationView==='after'?'is-solution':''}`}>
      <div className="hero-scene-crop"><img className="hero-scene-image" src={installation.image} alt={installation[installationView].alt} width={installation.imageWidth} height={installation.imageHeight} loading="lazy"/></div>
      <div className="hero-view-controls" role="group" aria-label="Показать потолок до или после обновления">{installation.tabs.map(t=><button key={t.id} aria-pressed={installationView===t.id} onClick={()=>setInstallationView(t.id as 'before'|'after')}><span/>{t.label}</button>)}</div>
      <span className="installation-image-tag">МОНТАЖ / ПЕРЕТЯЖКА</span>
      <div className="hero-story-caption" aria-live="polite"><span className="hero-story-icon">{installationView==='after'?<Sparkles size={25}/>:<RefreshCw size={25}/>}</span><div><span className="tiny-label">{installation[installationView].label}</span><h3>{installation[installationView].title}</h3><p>{installation[installationView].description}</p></div><button className="hero-next-scene" onClick={()=>setInstallationView(installationView==='after'?'before':'after')} aria-label={installationView==='after'?'Показать старый потолок':'Показать новый потолок'}><ArrowUpRight size={24}/></button></div>
      <span className="hero-image-label">{installation.imageLabel}</span>
     </div>
     <p className="installation-image-note">{installation.note}</p>
    </div>
    <div className="installation-copy"><p className="eyebrow">{installation.eyebrow}</p><h2 id="installation-title">{installation.title}<br/><span className="serif">{installation.accent}</span></h2><p>{installation.description}</p><ol className="installation-options">{installation.items.map((item,i)=><li key={item.title}><span>0{i+1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ol><div className="installation-actions"><a className="button primary" href={tel}><Phone size={18}/>{installation.callLabel}<ArrowUpRight size={19}/></a><a className="text-link" href="#assessment" onClick={()=>{setSituation('installation');setShowResult(false);}}>{installation.secondaryLabel}<ArrowRight size={18}/></a></div></div>
   </div></section>

   <section className="section wrap" id="projects"><div className="section-top"><div><p className="eyebrow">02 / ПРИМЕРЫ РАБОТ</p><h2>Результат видно<br/><span className="serif">в деталях.</span></h2></div></div><div className="projects-grid">{projects.map(p=><article className="project-card" key={p.id}><div className="project-image"><img src={p.image} alt={p.alt} width="900" height="650" loading="lazy"/><span className="image-tag">Демо · {p.city}</span></div><div className="project-info"><h3>{p.title}</h3><p>{p.description}</p></div></article>)}</div></section>

   <section className="prices wrap" id="prices"><div><p className="eyebrow">ОРИЕНТИР ПО СТОИМОСТИ</p><h2>Понятно,<br/><span className="serif">до начала работ.</span></h2><p>Финальная стоимость зависит от повреждения,<br/>материала потолка и объёма работ.</p><span className="demo-price-note">{prices.note}</span></div><div className="price-list">{prices.items.map(p=><div className="price-row" key={p.title}><span>{p.title}<small>Пример цены</small></span><strong>{p.value}</strong></div>)}<a className="text-link" href={tel}>Уточнить стоимость вашей задачи<ArrowUpRight size={19}/></a></div></section>

   <section className="section wrap" id="process"><div className="section-top"><div><p className="eyebrow">03 / КАК РАБОТАЕМ</p><h2>Без лишних хлопот.<br/><span className="serif">По шагам.</span></h2></div><p className="section-intro">От первого звонка<br/>до согласованного результата.</p></div><div className="steps">{content.steps.map((s,i)=><article className="step" key={s.title}><div className="step-index"><span>0{i+1}</span>{i<2&&<ArrowRight size={25}/>}</div><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></section>

   <section className="faq-section wrap" id="faq"><div><p className="eyebrow">04 / ЧАСТЫЕ ВОПРОСЫ</p><h2>Возможно,<br/>вы хотели<br/><span className="serif">спросить.</span></h2><p className="muted">Не нашли свой случай?<br/>Обсудим его по телефону.</p><a className="text-link" href={tel}>Задать вопрос<ArrowUpRight size={19}/></a></div><div className="faq-list">{faq.map((f,i)=><details key={f.question} name="faq"><summary><span className="faq-index">0{i+1}</span><span>{f.question}</span><Plus size={19}/></summary><p>{f.answer}</p></details>)}</div></section>

   <section className="contact-section" id="contacts"><div className="wrap contact-inner"><div><p className="eyebrow">ДАВАЙТЕ РЕШИМ ВАШУ ЗАДАЧУ</p><h2>Вернём дому<br/><span className="serif">спокойствие.</span></h2><div className="contact-cities"><MapPin size={19}/>{site.cities.join(' · ')}</div></div><div className="contact-details"><p>Расскажите, что случилось с потолком.<br/>Обсудим варианты ремонта и выезд.</p><a className="contact-phone" href={tel}>{site.phoneDisplay}<ArrowUpRight size={28}/></a><span className="contact-test">Тестовый номер для согласования макета</span><a className="button primary" href={tel}><Phone size={18}/>Позвонить мастеру<ArrowUpRight size={18}/></a><p className="contact-hours">График работы уточняется</p></div></div></section>
  </main>
  <footer className="wrap footer"><a className="footer-brand" href="#">РЕМОНТ ПОТОЛКОВ<span>.</span></a><span>{site.cities.join(' · ')}</span><span>© {new Date().getFullYear()} · Демонстрационная версия</span><a href="#main">Наверх ↑</a></footer>
  <a className="mobile-call button primary" href={tel}><Phone size={18}/>Позвонить · тестовый номер<ArrowUpRight size={19}/></a>
  <dialog ref={dialog} className="service-dialog" aria-labelledby="dialog-title" onCancel={()=>setActive(null)} onClick={e=>{if(e.target===e.currentTarget)close();}}><button ref={closeButton} className="dialog-close" onClick={close} aria-label="Закрыть описание услуги"><X size={23}/></button>{active&&<><p className="eyebrow">УСЛУГА / {active.number}</p><h2 id="dialog-title">{active.title}</h2><p className="dialog-description">{active.details}</p><ul className="check-list">{active.items.map(t=><li key={t}><Check size={18}/>{t}</li>)}</ul><a className="button primary" href={tel}><Phone size={18}/>Обсудить с мастером<ArrowUpRight size={18}/></a><p className="dialog-test">Тестовый номер: {site.phoneDisplay}</p></>}</dialog>
 </>;
}
