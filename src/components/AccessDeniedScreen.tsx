import React from 'react';
import { User } from 'firebase/auth';
import { ShieldAlert, LogOut, Mail, HelpCircle } from 'lucide-react';

interface AccessDeniedScreenProps {
  user: User;
  onLogout: () => void;
  onRetry: () => void;
}

export const AccessDeniedScreen: React.FC<AccessDeniedScreenProps> = ({
  user,
  onLogout,
  onRetry
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl border border-red-200 shadow-xl p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-rose-600" />

        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
          Acceso Restringido por CECO
        </h2>

        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          La cuenta <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded font-mono text-xs">{user.email}</strong> no tiene un Centro de Costo (CECO) o rol asignado en la planilla maestra de permisos de la Facultad.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left mb-6 text-xs text-amber-900 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-amber-950">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>¿Cómo obtener acceso a su Escuela?</span>
          </div>
          <p className="leading-relaxed">
            De acuerdo con las políticas de control presupuestario de la <strong>Facultad de Salud y Odontología</strong>, cada Director(a) debe ser previamente incorporado(a) por la Dirección de Gestión y Finanzas con su correo institucional y su CECO respectivo.
          </p>
          <div className="pt-2 border-t border-amber-200/60 flex items-center gap-1 text-xs text-amber-800">
            <Mail className="w-3.5 h-3.5 text-amber-600" />
            <span>Contacto: <strong>patricio.zamorano@mail.udp.cl</strong></span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onRetry}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
          >
            Reintentar verificación
          </button>

          <button
            onClick={onLogout}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-sm transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar sesión / Cambiar cuenta</span>
          </button>
        </div>
      </div>
    </div>
  );
};
