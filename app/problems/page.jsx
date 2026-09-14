import { getProblems } from '@/lib/loadProblems'
import ProblemsClient from './problemsClient'

export const metadata = { title: 'All Problem Statements — SIH 2026' }

export default function ProblemsPage() {
  const problems = getProblems()
  return <ProblemsClient problems={problems} />
}