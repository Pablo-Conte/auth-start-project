#!/bin/sh

# Função para rodar comandos com loading
loading() {
    local command="$1"
    local title="$2"
    local failMessage="$3"
    local successMessage="$4"

    local icon1="⏳"
    local icon2="⌛️"
    local current_icon=$icon1
    local clear_line='\033[K'  # Comando ANSI para limpar a linha a partir da posição do cursor

    printf "\t$current_icon $title$clear_line"
    eval $command > /dev/null 2>&1 &
    pid=$!

    while kill -0 $pid 2>/dev/null; do # kill -0 não mata o processo, apenas verifica se ele está rodando
        if [ "$current_icon" = "$icon1" ]; then
            current_icon=$icon2
        else
            current_icon=$icon1
        fi
        printf "\r\t$current_icon $title$clear_line"
        sleep 0.3 # A cada 0.3 segundos verifica o processo e troca o ícone se ainda estiver rodando
    done

    wait $pid # Espera o processo finalizar e pega o status de retorno
    status=$? # $? pega o status de retorno do último comando executado

    if [ $status -ne 0 ]; then # -ne é o operador de comparação "not equal"
        printf "\r\t❌ $failMessage$clear_line\n"
        exit 1
    else
        printf "\r\t✅ $successMessage$clear_line\n"
    fi
}