import { createHmac, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';

const COOKIE_NAME = 'imzo_admin_session';
const SESSION_SECONDS = 60 * 60 * 12;

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error('ADMIN_SESSION_SECRET kamida 32 belgidan iborat bo‘lishi kerak');
  return value;
}

function sign(value: string) {
  return createHmac('sha256', secret()).update(value).digest('base64url');
}

export function verifyAdminPassword(password: unknown) {
  const expected = process.env.ADMIN_PASSWORD;
  if (typeof password !== 'string' || !expected) return false;
  const actualHash = createHmac('sha256', secret()).update(password).digest();
  const expectedHash = createHmac('sha256', secret()).update(expected).digest();
  return timingSafeEqual(actualHash, expectedHash);
}

export function hasAdminSession(request: Request) {
  try {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
    if (!token) return false;
    const [payload, signature] = decodeURIComponent(token).split('.');
    if (!payload || !signature || !timingSafeEqual(Buffer.from(signature), Buffer.from(sign(payload)))) return false;
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: number };
    return typeof session.exp === 'number' && session.exp > Date.now();
  } catch {
    return false;
  }
}

export function setAdminSession(response: NextResponse) {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_SECONDS * 1000 })).toString('base64url');
  response.cookies.set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_SECONDS,
  });
}

export function clearAdminSession(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 0 });
}

export function unauthorized() {
  return NextResponse.json({ error: 'Ruxsat yo‘q' }, { status: 401 });
}
