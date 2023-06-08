export function show(...containers){
    for (const container of containers)
    container.classList.remove('off')
}

export function hide(...containers){
    for  (const container of containers)
    container.classList.add('off')
}

export function toggle(...containers){
    for (const container of containers)
    container.classList.toggle('off')
}

export const context = sessionStorage