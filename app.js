"use strict";
let questions=[],index=0,score=0,answers=[];const $=id=>document.getElementById(id);const show=id=>{for(const name of ['intro','quiz','results'])$(name).classList.toggle('hidden',name!==id)};
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const correctSet=q=>Array.isArray(q.correct)?q.correct:[q.correct];
const isMulti=q=>Array.isArray(q.correct);
const sameSet=(a,b)=>a.length===b.length&&a.every(v=>b.includes(v));
function render(){const q=questions[index];$('category').textContent=q.category+(isMulti(q)?' • Select all that apply':'');$('progressText').textContent=`Question ${index+1} of ${questions.length}`;$('progressBar').style.width=`${(index+1)/questions.length*100}%`;$('question').textContent=q.question;$('options').innerHTML='';$('feedback').className='feedback hidden';$('feedback').textContent='';$('next').classList.add('hidden');$('check').classList.toggle('hidden',!isMulti(q));$('check').disabled=true;const shapes=['▲','◆','●','■'];q.options.forEach((option,i)=>{const b=document.createElement('button');b.className='option';b.setAttribute('data-answer-index',String(i));b.setAttribute('aria-label',`Option ${i+1}: ${option}`);b.setAttribute('aria-pressed','false');const s=document.createElement('span');s.className='shape';s.textContent=shapes[i];const t=document.createElement('span');t.textContent=option;b.append(s,t);b.addEventListener('click',()=>select(i));$('options').append(b)});show('quiz');window.scrollTo(0,0)}
let chosen=[];
function select(choice){const q=questions[index];if(answers[index]!==undefined)return;if(!isMulti(q)){chosen=[choice];grade();return;}if(chosen.includes(choice))chosen=chosen.filter(x=>x!==choice);else chosen.push(choice);[...$('options').querySelectorAll('button')].forEach((b,i)=>{b.classList.toggle('selected',chosen.includes(i));b.setAttribute('aria-pressed',String(chosen.includes(i)))});$('check').disabled=chosen.length===0}
function grade(){const q=questions[index];if(answers[index]!==undefined)return;answers[index]=[...chosen].sort((a,b)=>a-b);const correct=sameSet(answers[index],correctSet(q));if(correct)score++;const buttons=[...$('options').querySelectorAll('button')];buttons.forEach((b,i)=>{b.disabled=true;if(correctSet(q).includes(i))b.classList.add('correct');else if(chosen.includes(i))b.classList.add('wrong')});$('check').classList.add('hidden');const f=$('feedback');f.className='feedback'+(correct?'':' incorrect');f.innerHTML=`<strong class="verdict">${correct?'✓ Correct!':'✕ Incorrect'}</strong><div class="correct-answer" data-correct-answer="true" data-correct-answers="${escapeHTML(JSON.stringify(correctSet(q).map(i=>q.options[i])))}">Correct ${isMulti(q)?'answers':'answer'}: ${escapeHTML(correctSet(q).map(i=>q.options[i]).join(', '))}</div><div>${escapeHTML(q.explanation)}</div>`;$('next').textContent=index===questions.length-1?'View results →':'Next question →';$('next').classList.remove('hidden')}
function results(){show('results');$('score').textContent=`${score} / ${questions.length}`;$('summary').textContent=`${Math.round(score/questions.length*100)}% correct — use this page to verify every answer.`;$('review').innerHTML=questions.map((q,i)=>`<article class="review-item" data-question-id="${q.id}"><strong>${i+1}. ${escapeHTML(q.question)}</strong><div class="right" data-correct-answer="true" data-correct-answers="${escapeHTML(JSON.stringify(correctSet(q).map(j=>q.options[j])))}">Correct ${isMulti(q)?'answers':'answer'}: ${escapeHTML(correctSet(q).map(j=>q.options[j]).join(', '))}</div><div class="${sameSet(answers[i]||[],correctSet(q))?'right':'wrong'}">Your answer: ${escapeHTML((answers[i]||[]).map(j=>q.options[j]).join(', '))} — ${sameSet(answers[i]||[],correctSet(q))?'Correct':'Wrong'}</div><small>${escapeHTML(q.explanation)}</small></article>`).join('');window.scrollTo(0,0)}
$('start').addEventListener('click',()=>{index=0;score=0;answers=[];chosen=[];render()});$('restart').addEventListener('click',()=>{index=0;score=0;answers=[];chosen=[];render()});$('next').addEventListener('click',()=>{if(index+1===questions.length)results();else{index++;chosen=[];render()}});$('check').addEventListener('click',grade);
async function load(){
  const startButton=$('start');
  try {
    const url=new URL('questions.json',document.baseURI);
    url.searchParams.set('v','6C2G4-50');
    const response=await fetch(url.toString(),{cache:'no-store'});
    if(!response.ok)throw new Error('Questions request returned HTTP '+response.status);
    const data=await response.json();
    if(!Array.isArray(data))throw new Error('Question file must contain a JSON array.');
    if(data.length!==50)throw new Error('Expected 50 questions, received '+data.length+'.');
    for(let i=0;i<data.length;i++){
      const q=data[i];
      if(!q||typeof q.question!=='string'||!Array.isArray(q.options)||q.options.length!==4||!q.options.every(v=>typeof v==='string'))throw new Error('Invalid question at position '+(i+1));
      const indices=Array.isArray(q.correct)?q.correct:[q.correct];
      if(!indices.length||!indices.every(n=>Number.isInteger(n)&&n>=0&&n<q.options.length))throw new Error('Invalid answer key at question '+(i+1));
    }
    questions=data;
    startButton.disabled=false;
    startButton.textContent='Start Quiz →';
  }catch(error){
    startButton.disabled=true;
    startButton.textContent='Unable to load questions';
    let message=document.getElementById('loadError');
    if(!message){message=document.createElement('p');message.id='loadError';message.setAttribute('role','alert');startButton.insertAdjacentElement('afterend',message)}
    message.textContent='Loading error: '+(error?.message||String(error))+'. Try refreshing this page.';
    console.error('Quiz question loading failed:',error);
  }
  $('urlText').textContent=location.href;
  makeQR();
}
function makeQR(){if(location.protocol==='file:'){$('qr').textContent='QR appears after publishing to GitHub Pages.';return;}const script=document.createElement('script');script.src='https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js';script.onload=()=>{if(window.QRCode){new QRCode($('qr'),{text:location.href,width:210,height:210,correctLevel:QRCode.CorrectLevel.M})}else{$('qr').textContent='Open this URL on your phone.'}};script.onerror=()=>{$('qr').textContent='QR library unavailable. Copy the URL shown below.'};document.head.append(script)}
load();